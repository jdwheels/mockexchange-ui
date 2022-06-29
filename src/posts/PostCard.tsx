import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../common/utils';
import { PostCardProps } from './types';
import { SourceLinkContext } from '../common/SourceLinkContext';

import styles from './PostCard.module.scss';

export const PostCard: FC<PostCardProps> = function ({ p }) {
  const sourceLink = useContext(SourceLinkContext);
  return (
    <div className={styles['mock-post']}>
      <div className={styles['mock-post-side']}>
        {p.score && (
          <div className={styles['mock-post-votes']}>
            {p.score}
            {' '}
            {pluralize(p.score, 'vote')}
          </div>
        )}
        {p.answerCount && (
          <div className={styles['mock-post-answer-count']}>
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
      <div className={styles['mock-post-main']}>
        <div className={styles['mock-post-header']}>
          <h3>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
          </h3>
          <a
            className={styles['mock-post-source']}
            href={`${sourceLink}/questions/${p.id}`}
          >
            Source
          </a>
        </div>
        <div className={styles['mock-post-footer']}>
          <div className={styles['mock-post-tags']}>
            {p.tags && (
              <ul>
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </div>
          <div className={styles['mock-post-last-activity']}>
            {p.lastEditorUserId && (
              <div className={styles['mock-post-last-editor']}>
                <span className={styles['mock-user-name']}>
                  <a href={`${sourceLink}/users/${p.lastEditorUserId}`}>
                    {p.lastEditorDisplayName}
                  </a>
                  {/* <Link to={`/users/${p.lastEditorUser.id}`}> */}
                  {/*  {p.lastEditorUser.displayName} */}
                  {/* </Link> */}
                </span>
                <span className={styles['mock-user-rep']}>
                  {p.lastEditorReputation}
                </span>
              </div>
            )}
            {p.lastEditDate && (
              <div className={styles['mock-post-last-edit-time']}>
                {new Date(p.lastEditDate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
