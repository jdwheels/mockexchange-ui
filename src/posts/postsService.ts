import { MockPost, PostsCollectionResponse, PostsResponse } from './types';
import { PageOptions } from '../common/types';

const baseUrl = '/posts-api';

async function getQuestions(
  { page, size }: PageOptions = { page: 0, size: 20 },
): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/posts/questions?page=${page}&size=${size}`);
  const body = await response.json() as PostsResponse;
  return body.content;
}

async function getAnswers(questionId: number | string): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/mockPosts/search/getAnswers?parentId=${questionId}`);
  const body = await response.json() as PostsCollectionResponse;
  return body._embedded.mockPosts;
}

async function getQuestion(id: number | string): Promise<MockPost> {
  const response = await fetch(`${baseUrl}/mockPosts/${id}`);
  return await response.json() as MockPost;
}

export const postsService = {
  getQuestions,
  getAnswers,
  getQuestion,
};
