import React from 'react';
import { Menu, User } from '@recipher/icons';
import { authorize, Manage } from '@recipher/support';
import Search from './search';

export default ({ session, member: { name = '', id } = {}, onSignOut }) => {

  const main = [ 
    { name: 'manage', Icon: Menu, claim: 'read booking' 
    , submenu: [ 
        { to: '/manage/bookings', title: 'Manage Bookings' } 
      , { to: '/api/bookings/csv', active: false, title: 'Download Bookings' } 
      ]
    }
  , { component: <Search />, claim: 'read booking' }
  ];

  const user = [
    { to: '/cart', title: 'Cart' }
  , { to: '/signup', title: 'Sign Up', authenticated: false }
  , { to: '/signon', title: 'Sign On', authenticated: false }

  , { name: 'user', align: 'right', Icon: User, indexLink: false, authenticated: true
    , submenu: [
        { to: '/user', title: 'Edit Settings', authenticated: true }
      , { to: '/user/password', title: 'Change Password', authenticated: true }
      , { to: '/bookings', title: 'View Bookings', authenticated: true }
      , { divider: true }
      , { title: 'Sign Out', onClick: _ => onSignOut(session.user.id), active: false, authenticated: true }
      ]
    }
  ];

  return { main, user };
};