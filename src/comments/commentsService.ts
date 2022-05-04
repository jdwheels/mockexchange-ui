import { CommentsResponse, MockComment } from '../posts/types';

const baseUrl = '/comments-api';

async function getComments(postIds: string): Promise<MockComment[]> {
  const response = await fetch(`${baseUrl}/mockComments/search/getCommentsFor?postIds=${postIds}`);
  const body = await response.json() as CommentsResponse;
  return body._embedded.mockComments;
}

export const commentsService = {
  getComments,
};
