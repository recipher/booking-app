import React from 'react';
import moment from 'moment-timezone';

export default ({ dt, tz = 'Europe/London', format = 'ddd MMM Do - h:mma' }) => {
  return <span>{moment.tz(dt, 'Europe/London').format(format)}</span>;
};