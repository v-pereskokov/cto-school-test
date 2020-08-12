import {memo, FC} from 'react';

import asPage from '__utils/hocs/asPage';

import {PAGE_SETTINGS} from '../../consts';
import Page from './Page';

export default asPage({
    ...PAGE_SETTINGS,
})(memo(Page)) as FC;
