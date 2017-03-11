import React from 'react';
import { Menu } from '@recipher/navigation';

export default _ => {
  const items = [ 
    { to: `/cart/register${window.location.search}`, title: 'Register' } 
  , { to: `/cart/signon${window.location.search}`, title: 'Sign On' } 
  ];

  const styles = {
    base: {
      fontSize: 20
    , padding: '5px 0 0 0'
    , '@media (max-width: 639px)': {
        fontSize: 18
      , padding: '0 0 5px 0'
      }
    }
  };

  return <Menu items={items} style={styles.base} />;
};