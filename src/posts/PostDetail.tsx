import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MockPost } from './types';

export const PostDetail: FC = function () {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<MockPost>();
  useEffect(() => {
    if (params.id) {
      fetch(`/api/mockPosts/${params.id}`)
        .then((r) => r.json())
        .then((j: MockPost) => setPost(j))
        .catch((e) => console.error(e));
    }
  }, [params.id]);
  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      )}
    </div>
  );
};
