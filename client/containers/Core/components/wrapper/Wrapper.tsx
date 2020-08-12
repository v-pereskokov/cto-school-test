import React from 'react';
import {Switch} from 'react-router';
import {YMInitializer} from 'react-yandex-metrika';

import Layout from '__components/Layout';
import {getRoutes} from '__utils/routes/makeRoutes';

import '__containers/Weather';
import '__containers/NotFound';

const YA_METRIKA_OPTIONS: {
    accounts: number[];
    options: object;
    version: '1' | '2' | undefined;
} = {
    accounts: [66338728],
    options: {
        webvisor: true,
    },
    version: '2',
};

const Wrapper = () => {
    return (
        <>
            <Layout>
                <Switch children={getRoutes()}/>
            </Layout>
            <YMInitializer {...YA_METRIKA_OPTIONS}/>
        </>
    );
};
export default Wrapper;
