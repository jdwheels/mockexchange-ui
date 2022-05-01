import React, { FC, useContext, useMemo } from 'react';
import { MockComment } from '../posts/types';
import { SourceLinkContext } from '../common/SourceLinkContext';
import { HtmlContent } from '../common/HtmlContent';

interface InlineCommentProps {
  comment: MockComment;
}

const InlineCommentImpl: FC<InlineCommentProps> = function ({ comment }) {
  const baseUrl = useContext(SourceLinkContext);
  const xd = useMemo(() => new Date(comment.creationDate), [comment.creationDate]);
  console.log(comment.id);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '2%' }}>{comment.score}</div>
      <HtmlContent>
        {comment.text}
      </HtmlContent>
      <div>
        &nbsp;-&nbsp;
        {comment.user ? (
          <a href={`${baseUrl}/users/${comment.user.id}`}>{comment.user.displayName || comment.user.id}</a>
        ) : (
          <span>{comment.userDisplayName}</span>
        )}
        {' '}
        {xd.toLocaleDateString()}
        {' '}
        at
        {' '}
        {xd.toLocaleTimeString()}
      </div>
    </div>
  );
};

export const InlineComment = React.memo(InlineCommentImpl);
