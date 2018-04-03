import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

const Image = ({ name }) => {

  const styles = {
    vertical: {
      display: 'flex'
    , flexDirection: 'column'
    , justifyContent: 'center'
    , height: 140
    , width: 140
    }
  };

  return (
    <div style={styles.vertical}>
      <img src={`/images/brand/${name}.jpg`} width={140}/>
    </div>
  );
};

const Anchor = ({ name, children }) => {
  return <Link to={`/brands/${name}`}>{children}</Link>;
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
    <Anchor name={name}>
      <div style={styles.base}>
        <Image name={name} />
        <Title name={props.brand.name} />
      </div>
    </Anchor>
  );
});