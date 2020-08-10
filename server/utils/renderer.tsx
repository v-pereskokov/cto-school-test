import fs from 'fs';
import {Helmet} from 'react-helmet';
import {renderObject, renderResource} from 'server/utils/renderObject';

const defaultSectionAssets: {
    styles: string[];
    scripts: string[];
} = {
    styles: [],
    scripts: [],
};

export default ({
    styles = [],
    styledTags,
    scripts = [],
    html,
    store,
    sectionName = undefined,
}) => {
    const helmet = Helmet.renderStatic();

    const sectionStyles = sectionName
        ? fs.readdirSync('dist/client/')
            .reduce((result, filename)=> {
                if (filename.toLowerCase().includes((sectionName || '').toLowerCase())) {
                    if (filename.includes('.css')) {
                        return {
                            ...result,
                            styles: [
                                ...result.styles,
                                `<style data-preload-section="true" rel="preload">${fs.readFileSync(`dist/client/${filename}`, 'utf-8')}</style>`,
                            ],
                        };
                    }

                    if (filename.includes('.js')) {
                        return {
                            ...result,
                            scripts: [
                                ...result.scripts,
                                `<script data-preload-section="true">// filename: ${filename} \n ${fs.readFileSync(`dist/client/${filename}`, 'utf-8')}</script>`,
                            ],
                        };
                    }
                }

                return result;
            }, defaultSectionAssets)
        : defaultSectionAssets;

    return `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta name='robots' content='noindex'>
                <meta name="google" content="notranslate">

                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="theme-color" content="#ffffff">
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮 </text></svg>">
                
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                
                <title>Найди свою погоду</title>
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                
                <link href="dist/Weather.css" rel="preload">
                ${styledTags}
                ${renderResource(sectionStyles.styles)}
                ${styles.map(script => `<style rel="preload">${fs.readFileSync(`dist/client/${script.file}`, 'utf-8')}</style>`).join('\n')}
            </head>

            <body>
                <div id="root">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${renderObject(store.getState())};
                </script>
                
                <script src="dist/Games.chunk.js"></script>
                ${renderResource(sectionStyles.scripts)}
                ${scripts.map(script => `<script src="/dist/${script.file}"></script>`).join('\n')}
            </body>
        </html>`;
};
