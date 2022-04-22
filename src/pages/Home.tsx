import React from 'react';
import { Link } from 'react-router-dom';
import { MockPost, PostsResponse } from '../posts/types';
import { PostsList } from '../posts/PostsList';
import { useFetch, UseFetchOptions } from '../common/utils';

const postOptions: UseFetchOptions<MockPost[]> = {
  resultMapper: (r: Response) => r.json().then((j: PostsResponse) => j.content),
};

export const Home: React.FC = function () {
  const [posts,, loadingPosts, postsError] = useFetch<MockPost[]>('/x/y', postOptions);

  return (
    <div data-testid="home">
      <h1>Software Engineering</h1>
      <h2>Explore Our Questions</h2>
      {loadingPosts && (
        <div className="loading">Loading...</div>
      )}
      {postsError && (
        <p>There was an error loading posts, try again later</p>
      )}
      {posts && (
        <PostsList posts={posts} />
      )}
      <div className="more-posts-wrap">
        <Link to="/posts" className="more-posts">
          More Posts
        </Link>
      </div>
    </div>
  );
};
