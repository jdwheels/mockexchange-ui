import { MockPost, PostsResponse } from './types';
import { PageOptions } from '../common/types';

const baseUrl = mx.env.postsBaseUrl;

async function getQuestions(
  { page, size }: PageOptions = { page: 0, size: 20 },
): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/posts/questions?page=${page}&size=${size}`);
  const body = await response.json() as PostsResponse;
  return body.content;
}

async function getAnswers(questionId: number | string): Promise<MockPost[]> {
  const response = await fetch(`${baseUrl}/posts/answers?parentId=${questionId}`);
  return await response.json() as MockPost[];
}

async function getQuestion(id: number | string): Promise<MockPost> {
  const response = await fetch(`${baseUrl}/posts/questions/${id}`);
  return await response.json() as MockPost;
}

export const postsService = {
  getQuestions,
  getAnswers,
  getQuestion,
};
