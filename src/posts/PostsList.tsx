import React, { FC } from 'react';
import { PostCard } from './PostCard';
import { PostsListProps } from './types';

export const PostsList: FC<PostsListProps> = function ({ posts }) {
  return (
    <ul className="mock-post-list">
      {posts.map((p) => (
        <li key={p.id}>
          <PostCard p={p} />
        </li>
      ))}
    </ul>
  );
};
