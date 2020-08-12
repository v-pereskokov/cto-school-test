import React from 'react';

import Form from '../form';
import Map from '../map';

import {b} from './Page.scss';

const Page = () => {
    return (
        <div className={b()}>
            <Map/>

            <h1 className={b('title')}>
                Оденься по погоде в своём городе.
            </h1>

            <Form/>
        </div>
    );
};
export default Page;
