import React, { FC } from 'react';
import { PostCard } from './PostCard';
import { PostsListProps } from './types';
import styles from './PostsList.module.scss';

export const PostsList: FC<PostsListProps> = function ({ posts }) {
  return (
    <ul className={styles['mock-post-list']}>
      {posts.map((p) => (
        <li key={p.id}>
          <PostCard p={p} />
        </li>
      ))}
    </ul>
  );
};
