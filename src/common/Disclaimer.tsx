import React, { useContext } from 'react';
import { SourceLinkContext } from './SourceLinkContext';

export const Disclaimer: React.FC = function () {
  const sourceLink = useContext(SourceLinkContext);
  return (
    <p>
      This content originates from the
      {' '}
      <a href={sourceLink}>StackExchange</a>
      {' '}
      network via
      {' '}
      <a href="https://archive.org/details/stackexchange">Internet Archive</a>
    </p>
  );
};
