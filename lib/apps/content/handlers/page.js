import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Content from '../components/content';

const Page = Radium(props => {
  const styles={
    base: {
      margin: '0 auto'
    , width: '60%'
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
      <Content page={props.page} />
    </div>
  );
});

const mapStateToProps = (state, props) => ({ page: props.params.page });  

export default connect(mapStateToProps)(Page);

