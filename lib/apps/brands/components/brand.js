import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

const Image = ({ name }) => {
  const styles = {
    base: {
    }
  };

  return <img style={styles.base} src={`/images/brand/${name}.jpg`} width={80} />;
};

const Anchor = ({ name, children }) => {
  const styles = {
    base: {

    }
  };

  return <Link style={styles.base} to={`/brands/${name}`}>{children}</Link>;
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
  const name = slugify(props.brand.name);

  const styles = {
    base: {
      display: 'inline-block'
    , color: '#666'
    , padding: '0 10px 20px 10px'
    , margin: '0 10px 20px 10px'
    , width: 100
    , transition: 'all 0.15s ease-in'
    , ':hover': {
        color: '#333'
      }
    }
  };

  return (
    <Anchor name={name}>
      <div style={styles.base}>
        <Image name={name} />
        <Title name={props.brand.name} />
      </div>
    </Anchor>
  );
});