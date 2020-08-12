import {memo} from 'react';

import Select from './Select';
import {Props, OwnProps} from './types';

export {OwnProps as SelectProps};
export default memo<Props<string>>(Select);
