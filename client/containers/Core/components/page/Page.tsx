import React, {FC} from 'react';

import ErrorBoundary from '__components/ErrorBoundry/ErrorBoundry';

import Wrapper from '../wrapper';

const {__PROD__} = process.env;

const Page: FC = () => {
    return __PROD__
        ? (
            <ErrorBoundary>
                <Wrapper/>
            </ErrorBoundary>
        )
        : <Wrapper/>;
};
export default Page;
