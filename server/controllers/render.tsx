import {NextFunction, Request, Response} from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable-ssr-addon';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

import {ROUTES} from '__config/routes';
import Core from '__containers/Core';
import {reducers} from '__reducers';
import configureStore from '__store';

import renderer from 'utils/renderer';

const manifest = require('../../dist/client/react-loadable-ssr-addon.json');

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const {store} = configureStore(
            reducers,
            {},
            {isLogger: false, router: {initialEntries: [req.url]}},
        );

        const path = Object.keys(ROUTES.GAMES.views).find(current => {
            return ROUTES.GAMES.views[current]?.route === req.url;
        });

        Promise.resolve()
            .then(() => {
                const context = {};
                const modules = new Set();
                const addModule = moduleName => modules.add(moduleName);

                const sheet = new ServerStyleSheet();

                const html = renderToString((
                    <StyleSheetManager sheet={sheet.instance}>
                        <Loadable.Capture report={addModule}>
                            <Provider store={store}>
                                <StaticRouter location={req.url} context={context}>
                                    <Core/>
                                </StaticRouter>
                            </Provider>
                        </Loadable.Capture>
                    </StyleSheetManager>
                ));

                if ((context as any).status === 404) {
                    return res.status(404);
                }

                const bundles = getBundles(
                    manifest,
                    [...manifest.entrypoints, ...Array.from(modules)],
                );

                const styles = bundles.css || [];
                const scripts = bundles.js || [];

                const styledTags = sheet.getStyleTags();

                res.send(renderer({
                    styles,
                    scripts,
                    styledTags,
                    html,
                    store,
                    sectionName: ROUTES.GAMES.views[path]?.name,
                }));
            })
            .catch(error => {
                next(error);
            });
    } catch (error) {
        next(error);
    }
};
