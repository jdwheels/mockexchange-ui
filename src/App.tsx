import React, { FC, useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router';
import {
  handleNullResponse, useAsync,
} from './common/utils';
import { Disclaimer } from './common/Disclaimer';
import { SourceLinkContext } from './common/SourceLinkContext';
import { userService } from './users/userService';
import { Loading } from './common/Loading';

const Posts = React.lazy(() => import('./pages/Posts'));

const Home = React.lazy(() => import('./pages/Home'));

const App: FC = function () {
  const [userDetails, setUserDetails, loadingUserDetails] = useAsync(
    userService.getUserDetails,
    undefined,
    null,
  );

  const handleLogout = useCallback(() => {
    userService.logout()
      .then(handleNullResponse)
      .then(() => {
        setUserDetails(null);
      })
      .catch((e) => console.error(e));
  }, [setUserDetails]);

  const details = useMemo(() => {
    const { version, sha } = mx.env;
    return JSON.stringify({ version, sha }, null, 2);
  }, []);

  if (loadingUserDetails) {
    return <Loading />;
  }
  return (
    <div>
      <pre>
        <code>
          {details}
        </code>
      </pre>
      {userDetails ? (
        <button className="logout" type="button" onClick={handleLogout}>Logout</button>
      ) : (
        <a className="login" href={`${mx.env.loginBaseUrl}/oauth2/authorization/github`}>Login with GitHub</a>
      )}
      {userDetails && (
        <div>
          <SourceLinkContext.Provider value="https://softwareengineering.stackexchange.com">
            <Disclaimer />
            <Routes>
              <Route
                path="/posts/*"
                element={(
                  <React.Suspense fallback={<Loading />}>
                    <Posts />
                  </React.Suspense>
                )}
              />
              <Route
                path="/"
                element={(
                  <React.Suspense fallback={<Loading />}>
                    <Home />
                  </React.Suspense>
                )}
              />
            </Routes>
          </SourceLinkContext.Provider>
        </div>
      )}
    </div>
  );
};

export default App;
