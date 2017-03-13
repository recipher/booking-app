import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { Image } from '@recipher/component';
import slugify from '../../../support/slugify';

const Photo = ({ brand, product }) => {
  return <Image width={140} src={`/images/bike/${product}.jpg`} fallbackSrc={`/images/brand/${brand}.jpg`}  />;
};

const Anchor = ({ brand, product, children }) => {
  return <Link to={`/brands/${brand}/${slugify(product)}`}>{children}</Link>;
};

const Title = ({ name }) => {
  const styles = {
    base: {
      textAlign: 'center'
    , color: 'inherit'
    , fontSize: '0.9em'
    }
  };

  return <div style={styles.base}>{name}</div>;
};

export default Radium(props => {
  if (props.product == null) return <span/>;

  const product = slugify(props.product.name)
      , brand = slugify(props.brand.name);

  const styles = {
    base: {
      display: 'inline-block'
    , color: '#666'
    , padding: 10
    , margin: '0 20px 20px 0'
    , width: 160
    , borderRadius: 4
    , transition: 'all 0.15s ease-in-out'
    , ':hover': {
        color: '#333'
      , boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }
    }
  };

  return (
    <Anchor brand={brand} product={product}>
      <div style={styles.base}>
        <Photo product={product} brand={brand} />
        <Title name={props.product.name} />
      </div>
    </Anchor>
  );
});