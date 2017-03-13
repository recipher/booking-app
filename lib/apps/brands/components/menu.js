import React from 'react';
import { Menu } from '@recipher/navigation';
import slugify from '../../../support/slugify';

export default ({ product, brand, slot }) => {
  const items = [ 
    { to: '/brands', title: 'Select a Brand' }
  , { to: brand && `/brands/${slugify(brand)}`, title: 'Select a Bike' }
  , { to: brand && product && `/brands/${slugify(brand)}/${slugify(product)}`, title: 'Select a Time' }
  , { to: slot && '/booking', title: 'Enter your Information' }
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