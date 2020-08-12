import React, {FC, useRef, useEffect} from 'react';

import Input from '__components/Input';

import {b} from './Form.scss';

const Form: FC = () => {
    return (
        <form className={b()}>
            <Input/>
        </form>
    );
};
export default Form;
