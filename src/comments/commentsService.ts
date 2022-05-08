import { CommentsResponse, MockComment } from '../posts/types';

const baseUrl = `${mx.env.commentsBaseUrl}/comments-api`;

const baseOptions: RequestInit = {
  credentials: 'include',
};

async function getComments(postIds: string): Promise<MockComment[]> {
  const response = await fetch(`${baseUrl}/mockComments/search/getCommentsFor?postIds=${postIds}`, baseOptions);
  const body = await response.json() as CommentsResponse;
  return body._embedded.mockComments;
}

export const commentsService = {
  getComments,
};
