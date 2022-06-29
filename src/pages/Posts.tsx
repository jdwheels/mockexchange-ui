import { Route, Routes } from 'react-router';
import React from 'react';
import { PostDetail } from '../posts/PostDetail';
import { AllPosts } from '../posts/AllPosts';

const Posts = function () {
  return (
    <Routes>
      <Route path="/:id" element={<PostDetail />} />
      <Route element={<AllPosts />} />
    </Routes>
  );
};

export default Posts;
