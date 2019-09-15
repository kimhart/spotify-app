import React from "react";

const Login = props => {
  const { completeAuthUrl } = props;
  return (
    <div className="page page--login">
      <div className="page page--login">
        <div>
          <h1>Welcome</h1>
          <a href={completeAuthUrl}>
            <button className="button--primary">Login to Spotify</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
