interface CollectionResponse<S extends string, T> {
  _embedded: Record<S, T[]>
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface ContentResponse<T> {
  content: T[];
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: Sort
    unpaged: boolean
  }
  size: number
  sort: Sort
  totalElements: number
  totalPages: number
}

interface MockVote {
  'id' : number,
  'postId' : number,
  'voteTypeId' : number,
  'userId'? : number | null,
  'creationDate' : string
}

interface MockUser {
  'id' : number,
  'reputation' : number,
  'creationDate' : string,
  'displayName' : string,
  'lastAccessDate' : string,
  'websiteUrl' : string,
  'location' : string,
  'aboutMe' : string,
  'views' : number,
  'upVotes' : number,
  'downVotes' : number,
  'accountId' : number,
  'profileImageUrl' : string
}

export interface MockPost {
  id: number
  'postType' : 'ANSWER',
  'parentId' : number,
  'acceptedAnswerId'? : number,
  'ownerUserId' : number,
  'ownerDisplayName'? : string | null,
  'lastEditorUserId' : number,
  'lastEditorDisplayName'? : string | null,
  'lastEditorReputation'?: number | null,
  'score' : number,
  'title'? : string | null,
  'body' : string,
  'contentLicense' : string,
  'allTags'? : string | null,
  'creationDate' : string,
  'lastEditDate' : string,
  'lastActivityDate' : string,
  'closedDate'? : string | null,
  'communityOwnedDate' : string,
  'viewCount'? : number | null,
  'commentCount' : number,
  'answerCount'?: number | null,
  'favoriteCount'?: number | null,
  tags?: string[] | null,
  'ownerUser'? : MockUser | null
  votes?: MockVote[] | null
  lastEditorUser?: MockUser | null
}

export interface PostCardProps {
  p: MockPost
}

export interface PostsListProps {
  posts: MockPost[];
}

export type PostsCollectionResponse = CollectionResponse<'postSummaryList', MockPost>;
export type PostsResponse = ContentResponse<MockPost>;

export interface MockComment {
  'id' : number,
  'postId' : number,
  'score' : number,
  'text' : string
  'creationDate' : string
  'userId' : number | null,
  'userDisplayName' : string | null,
  'contentLicense' : string,
  user: MockUser | null
}

export type CommentsResponse = CollectionResponse<'mockComments', MockComment>;
