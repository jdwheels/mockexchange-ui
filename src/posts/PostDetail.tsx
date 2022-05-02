import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  CommentsResponse, MockComment, MockPost, PostsCollectionResponse,
} from './types';
import { useFetch, UseFetchOptions } from '../common/utils';
import { InlineComment } from '../comments/InlineComment';
import { Answer } from './Answer';
import { Loading } from '../common/Loading';

const commentOptions: UseFetchOptions<MockComment[]> = {
  resultMapper: (r: Response) => r.json().then((j: CommentsResponse) => j._embedded.mockComments),
};

const answerOptions: UseFetchOptions<MockPost[]> = {
  resultMapper: (
    r: Response,
  ) => r.json().then((j: PostsCollectionResponse) => j._embedded.mockPosts),
};

interface PostDetailImplProps {
  postId: string;
}

const PostDetailImpl: FC<PostDetailImplProps> = function ({ postId }) {
  const [post] = useFetch<MockPost>(`/posts-api/mockPosts/${postId}`);
  const [postComments] = useFetch<MockComment[]>(`/comments-api/mockComments/search/getCommentsFor?postIds=${postId}`, commentOptions);
  const [answers] = useFetch<MockPost[]>(`/posts-api/mockPosts/search/getAnswers?parentId=${postId}`, answerOptions);

  const [replyIds, setReplyIds] = useState<string>('');

  useEffect(() => {
    if (answers?.length) {
      setReplyIds(answers.map((r) => r.id).join(','));
    }
  }, [answers]);

  const [otherComments] = useFetch<MockComment[]>(
    `/comments-api/mockComments/search/getCommentsFor?postIds=${replyIds}`,
    commentOptions,
    replyIds !== '',
  );

  const [answerComments, setAnswerComments] = useState<Record<number, MockComment[]>>();
  useEffect(() => {
    console.log(otherComments);
    if (otherComments) {
      const result = otherComments.reduce<Record<number, MockComment[]>>((acc, curr) => {
        if (acc[curr.postId]) {
          acc[curr.postId].push(curr);
        } else {
          acc[curr.postId] = [curr];
        }
        return acc;
      }, {});
      setAnswerComments(result);
    }
  }, [otherComments]);

  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: post.body }} />
          {postComments && (
            <ul>
              {postComments.map((c) => (
                <li key={c.id}>
                  <InlineComment comment={c} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {answers && (
        <div>
          {answers.length}
          {' '}
          Answers
          <ul>
            {answers.map((r) => (
              <li key={r.id}>
                <Answer post={r} comments={answerComments && answerComments[r.id]} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const PostDetail = function () {
  const { id } = useParams<{ id: string }>();
  return id ? <PostDetailImpl postId={id} /> : <Loading />;
};
