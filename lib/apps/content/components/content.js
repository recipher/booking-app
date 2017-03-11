import React from 'react';
import Markdown from 'react-markdown';
import NotFound from '../../../handlers/404';
import pages from '../pages';

export default ({ page }) => {
  if (pages[page] == null) return <NotFound />;

  return <Markdown source={pages[page]} />;
};