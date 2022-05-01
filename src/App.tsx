import React, { FC, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { PostDetail } from './posts/PostDetail';
import { Home } from './pages/Home';
import { AllPosts } from './posts/AllPosts';
import {
  handleNullResponse, logout,
} from './common/utils';
import { useUserDetails } from './users/utils';
import { Disclaimer } from './common/Disclaimer';
import { SourceLinkContext } from './common/SourceLinkContext';

const App: FC = function () {
  const [userDetails, setUserDetails] = useUserDetails();
  const handleLogout = useCallback(() => {
    logout()
      .then(handleNullResponse)
      .then(() => {
        setUserDetails(null);
      })
      .catch((e) => console.error(e));
  }, [setUserDetails]);
  return (
    <div>
      {userDetails ? (
        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
      ) : (
        <a className="login" href="/posts-api/oauth2/authorization/github">Login with GitHub</a>
      )}
      {userDetails && (
        <div>
          <SourceLinkContext.Provider value="https://softwareengineering.stackexchange.com">
            <Disclaimer />
            <Routes>
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts" element={<AllPosts />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </SourceLinkContext.Provider>
        </div>
      )}
    </div>
  );
};

export default App;
