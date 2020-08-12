import React, {FC} from 'react';

import Form from '../form';
import Info from '../info';
import Map from '../map';

import {b} from './Page.scss';

const Page: FC = () => {
    return (
        <div className={b()}>
            <Map/>

            <h1 className={b('title')}>
                Оденься по погоде в своём городе.
            </h1>

            <div className={b('form')}>
                <Form/>
            </div>

            <Info/>
        </div>
    );
};
export default Page;
