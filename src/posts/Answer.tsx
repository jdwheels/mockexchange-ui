import React, { FC, useEffect, useState } from 'react';
import { pluralize } from '../common/utils';
import { MockComment, MockPost } from './types';
import { HtmlContent } from '../common/HtmlContent';
import { InlineComment } from '../comments/InlineComment';

interface AnswerProps {
  comments?: MockComment[]
  post: MockPost;
}

const AnswerImpl: FC<AnswerProps> = function ({ post, comments }) {
  const [shownComments, setShownComments] = useState<MockComment[]>([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [remainingComments, setRemainingComments] = useState(0);
  console.log(`r ${post.id}`);
  useEffect(() => {
    if (comments) {
      if (showAllComments) {
        setShownComments(comments);
        setRemainingComments(0);
      } else {
        const toShow = comments.slice(0, 5);
        setShownComments(toShow);
        setRemainingComments(comments.length - toShow.length);
      }
    }
  }, [comments, showAllComments]);

  const handleShowAllComments = function () {
    setShowAllComments(true);
  };
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '3%' }}>{post.score}</div>
      <div className="post-body">
        <HtmlContent>
          {post.body}
        </HtmlContent>
        {comments && (
          <div>
            <ul>
              {shownComments.map((orc) => (
                <li key={orc.id}>
                  <InlineComment comment={orc} />
                </li>
              ))}
            </ul>
            {!showAllComments && remainingComments > 0 && (
              <button type="button" onClick={handleShowAllComments}>
                Show
                {' '}
                {remainingComments}
                {' '}
                more
                {' '}
                {pluralize(remainingComments, 'comment')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

AnswerImpl.defaultProps = {
  comments: [],
};

export const Answer = React.memo(AnswerImpl);
