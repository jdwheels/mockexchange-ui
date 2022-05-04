import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MockComment, MockPost } from './types';
import { useAsync } from '../common/utils';
import { InlineComment } from '../comments/InlineComment';
import { Answer } from './Answer';
import { Loading } from '../common/Loading';
import { postsService } from './postsService';
import { commentsService } from '../comments/commentsService';

interface PostDetailImplProps {
  postId: string;
}

const PostDetailImpl: FC<PostDetailImplProps> = function ({ postId }) {
  const [post] = useAsync<MockPost, string>(postsService.getQuestion, postId, null);
  const [postComments] = useAsync<MockComment[], string>(commentsService.getComments, postId, []);
  const [answers] = useAsync<MockPost[], string>(postsService.getAnswers, postId, null);

  const [replyIds, setReplyIds] = useState<string>('');

  useEffect(() => {
    if (answers?.length) {
      setReplyIds(answers.map((r) => r.id).join(','));
    }
  }, [answers]);

  const [otherComments] = useAsync<MockComment[], string>(
    commentsService.getComments,
    replyIds,
    [],
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
