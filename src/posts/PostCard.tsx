import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../common/utils';
import { PostCardProps } from './types';
import { SourceLinkContext } from '../common/SourceLinkContext';

export const PostCard: FC<PostCardProps> = function ({ p }) {
  const sourceLink = useContext(SourceLinkContext);
  return (
    <div className="mock-post">
      <div className="mock-post-side">
        {p.votes && (
          <div className="mock-post-votes">
            {p.votes.length}
            {' '}
            {pluralize(p.votes.length, 'vote')}
          </div>
        )}
        {p.answerCount && (
          <div className="mock-post-answer-count">
            {p.answerCount}
            {' '}
            {pluralize(p.answerCount, 'answer')}
          </div>
        )}
        {p.viewCount && (
          <div>
            {p.viewCount}
            {' '}
            {pluralize(p.viewCount, 'view')}
          </div>
        )}
      </div>
      <div className="mock-post-main">
        <div className="mock-post-header">
          <h3>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </h3>
          <a
            className="mock-post-source"
            href={`${sourceLink}/questions/${p.id}`}
          >
            Source
          </a>
        </div>
        <div className="mock-post-footer">
          <div className="mock-post-tags">
            {p.tags && (
              <ul>
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </div>
          <div className="mock-post-last-activity">
            {p.lastEditorUser && (
              <div className="mock-post-last-editor">
                <span className="mock-user-name">
                  <a href={`${sourceLink}/users/${p.lastEditorUser.id}`}>
                    {p.lastEditorUser.displayName}
                  </a>
                  {/* <Link to={`/users/${p.lastEditorUser.id}`}> */}
                  {/*  {p.lastEditorUser.displayName} */}
                  {/* </Link> */}
                </span>
                <span className="mock-user-rep">
                  {p.lastEditorUser.reputation}
                </span>
              </div>
            )}
            {p.lastEditDate && (
              <div className="mock-post-last-edit-time">
                {new Date(p.lastEditDate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
