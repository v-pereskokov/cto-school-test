import React, {FC, useRef, useEffect} from 'react';

import Button, {Group} from '__components/Button';
import Select from '__components/Select';

import {b} from './Form.scss';

const Form: FC = () => {


    return (
        <form className={b()}>
            <div className={b('wrapper')}>
                <Select suggest="country" placeholder="Страна" autoFocus/>
                <Select suggest="address" placeholder="Город"/>
            </div>

            <div className={b('wrapper')}>
                <Group>
                    <Button theme="primary">
                        Найти!
                    </Button>
                </Group>
            </div>
        </form>
    );
};
export default Form;
