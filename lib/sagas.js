import createSagaMiddleware from 'redux-saga';
import { sagas as io } from '@recipher/io';
import { sagas as session } from '@recipher/session-web';
import { sagas as user } from '@recipher/user-web';
import { sagas as contact } from '@recipher/contact-web';
import { sagas as signup } from '@recipher/signup-web';
import { sagas as member } from '@recipher/member-web';
import { sagas as members } from '@recipher/members-web';

import booking from './apps/booking/sagas';
import cart from './apps/cart/sagas';

export default createSagaMiddleware(...io, ...session, ...signup, ...member, ...members, ...user, ...contact, 
                                    ...booking, ...cart);