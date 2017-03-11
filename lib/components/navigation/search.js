import React from 'react';
import { components } from '@recipher/members-web';

const Search = components.Search;

export default _ => {
  const styles = {
    form: {
      display: 'inline-block'
    , marginTop: -8
    , marginBottom: -21
    }
  , field: {
      paddingTop: '0.4em'
    , paddingBottom: '0.4em'
    , paddingLeft: '2em'
    , paddingRight: '1em'
    , marginTop: 4
    , boxShadow: 'none'
    , border: 0
    , fontSize: '0.9em'
    , letterSpacing: 0.5
    , opacity: 0.7
    , ':focus': {
        boxShadow: 'none'
      , border: 0
      , opacity: 1
      }
    , icon: {
        top: '0.25em'
      , left: 0
      }
    }
  };

  return <Search styles={styles} allowFloat={false} />;
};
