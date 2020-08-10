import React from 'react';
import {Switch} from 'react-router';

import Layout from '__components/Layout';
import {getRoutes} from '__utils/routes/makeRoutes';

import '__containers/NotFound';

const Wrapper = () => {
    return (
        <Layout>
            <Switch children={getRoutes()}/>
        </Layout>
    );
};
export default Wrapper;
