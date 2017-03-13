import React, { Component } from 'react';
import Radium from 'radium';

const Wrap = Radium(props => {
  const styles={
    base: {
      margin: '0 auto'
    , width: '70%'
    , minWidth: 400
    , paddingTop: 0
    , paddingBottom: 20
    , '@media (max-width: 639px)': {
        margin: 0
      , width: '100%'
      , minWidth: 0
      }
    }
  };

  return (
    <div style={styles.base}>
      {props.children}
    </div>
  );
});

export default function(DecoratedComponent) {
  class Wrapper extends Component {
    render() {
      return <Wrap {...this.props}><DecoratedComponent /></Wrap>;
    }
  }

  return Wrapper;
};
