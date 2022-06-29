import React from 'react';
import { Link } from 'react-router-dom';
import { MockPost } from '../posts/types';
import { PostsList } from '../posts/PostsList';
import { useAsync } from '../common/utils';
import { Loading } from '../common/Loading';
import { postsService } from '../posts/postsService';

const Home: React.FC = function () {
  const [posts,, loadingPosts, postsError] = useAsync<MockPost[], undefined>(
    postsService.getQuestions,
    undefined,
    null,
  );
  return (
    <div data-testid="home">
      <h1>Software Engineering</h1>
      <h2>Explore Our Questions</h2>
      {loadingPosts && (
        <Loading />
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

export default Home;
