import {memo, FC} from 'react';

import asPage from '__utils/hocs/asPage';

import {PAGE_SETTINGS} from '../../consts';
import Page from './Page';
import preloader from './preloader';

export default asPage({
    ...PAGE_SETTINGS,
    preloader,
})(memo(Page)) as FC;
