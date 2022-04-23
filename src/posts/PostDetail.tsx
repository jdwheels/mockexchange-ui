import React, {
  FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router';
import {
  CommentsResponse, MockComment, MockPost, PostsCollectionResponse,
} from './types';
import { pluralize, useFetch, UseFetchOptions } from '../common/utils';
import { HtmlContent } from '../common/HtmlContent';
import { SourceLinkContext } from '../common/SourceLinkContext';

const commentOptions: UseFetchOptions<MockComment[]> = {
  resultMapper: (r: Response) => r.json().then((j: CommentsResponse) => j._embedded.mockComments),
};

const replyOptions: UseFetchOptions<MockPost[]> = {
  resultMapper: (
    r: Response,
  ) => r.json().then((j: PostsCollectionResponse) => j._embedded.mockPosts),
};

interface InlineCommentProps {
  comment: MockComment;
}

const InlineCommentImpl: FC<InlineCommentProps> = function ({ comment }) {
  const baseUrl = useContext(SourceLinkContext);
  const xd = useMemo(() => new Date(comment.creationDate), [comment.creationDate]);
  // const x = useMemo(() => (
  //   <>
  //     {xd.toLocaleDateString()}
  //     {' '}
  //     at
  //     {' '}
  //     {xd.toLocaleTimeString()}
  //   </>
  // ), [xd]);
  console.log(comment.id);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '2%' }}>{comment.score}</div>
      <HtmlContent>
        {comment.text}
      </HtmlContent>
      <div>
        &nbsp;-&nbsp;
        {comment.user ? (
          <a href={`${baseUrl}/users/${comment.user.id}`}>{comment.user.displayName || comment.user.id}</a>
        ) : (
          <span>{comment.userDisplayName}</span>
        )}
        {' '}
        {xd.toLocaleDateString()}
        {' '}
        at
        {' '}
        {xd.toLocaleTimeString()}
      </div>
    </div>
  );
};

const InlineComment = React.memo(InlineCommentImpl);

interface InlineReplyProps {
  comments?: MockComment[]
  post: MockPost;
}

const InlineReplyImpl: FC<InlineReplyProps> = function ({ post, comments }) {
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

InlineReplyImpl.defaultProps = {
  comments: [],
};

const InlineReply = React.memo(InlineReplyImpl);

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

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const [postComments] = useFetch<MockComment[]>(`/api/mockComments/search/y?postIds=${params.id}`, commentOptions);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const [replies] = useFetch<MockPost[]>(`/api/mockPosts/search/xy?parentId=${params.id}`, replyOptions);

  const [replyIds, setReplyIds] = useState<string>('');
  useEffect(() => {
    if (replies?.length) {
      setReplyIds(replies.map((r) => r.id).join(','));
    }
  }, [replies]);

  const [otherComments] = useFetch<MockComment[]>(`/api/mockComments/search/y?postIds=${replyIds}`, commentOptions, replyIds !== '');

  const [replyComments, setReplyComments] = useState<Record<number, MockComment[]>>();
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
      setReplyComments(result);
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
      {replies && (
        <div>
          {replies.length}
          {' '}
          Answers
          <ul>
            {replies.map((r) => (
              <li key={r.id}>
                <InlineReply post={r} comments={replyComments && replyComments[r.id]} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
