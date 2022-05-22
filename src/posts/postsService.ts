import { MockPost, PostsCollectionResponse, PostsResponse } from './types';
import { PageOptions } from '../common/types';

const baseUrl = `${mx.env.postsBaseUrl}`;

const baseOptions: RequestInit = {
  credentials: 'include',
};

async function getQuestions(
  { page, size }: PageOptions = { page: 0, size: 20 },
): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/posts/questions?page=${page}&size=${size}`, baseOptions);
  const body = await response.json() as PostsCollectionResponse;
  return body._embedded.postSummaryList;
}

async function getAnswers(questionId: number | string): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/posts/answers?parentId=${questionId}`, baseOptions);
  return await response.json() as MockPost[];
}

async function getQuestion(id: number | string): Promise<MockPost> {
  const response = await fetch(`${baseUrl}/posts/questions/${id}`, baseOptions);
  return await response.json() as MockPost;
}

export const postsService = {
  getQuestions,
  getAnswers,
  getQuestion,
};
