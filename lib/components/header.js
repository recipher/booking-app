import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { Desktop, Mobile } from './navigation';
import Logo from './logo';

@Radium
export default class Header extends Component {
  render() {
    const styles = {
      base: {
        position: 'relative'
      , padding: '5px 20px 10px 20px'
      , borderBottom: '1px solid rgba(0,0,0,.15)'
      , '@media (min-width: 1024px)': {
          padding: '5px 30px 10px 30px'
        }
      }
    };

    return (
      <div style={styles.base}>        
        <Link to='/brands' style={{textDecoration: 'none', color: '#333'}}>
          <Logo style={{marginTop: 2}} />
        </Link>

        <Desktop {...this.props} />
        <Mobile {...this.props} />
      </div>
    );
  }
};
