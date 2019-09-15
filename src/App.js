import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes, hash } from "./utils/auth";
import Playing from './components/pages/playing';
import Submit from './components/pages/submit';
import Connect from './components/pages/connect';
import Browse from './components/pages/browse';
import Intro from './components/pages/intro';
import Login from './components/pages/login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      token: null
    };
  }

  componentDidMount() {
    if (hash.access_token) {
      this.setState({ token: hash.access_token })
      // makes you re-login every time you refresh. Uncomment to keep pretty urls
      // window.location.hash = "";
    }
  }

  render() {
    const { token } = this.state;
    const { hash } = window.location;
    const completeAuthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

    return (
      <div className="App">
        <Router>
          {!token && <Login completeAuthUrl={completeAuthUrl} />}
          <Route exact path="/login" component={() => <Login completeAuthUrl={completeAuthUrl} />} />
          {token && 
            <Switch>
              <Route exact path="/" component={() => <Intro hash={hash} />} />
              <Route
                path="/playing"
                render={props => <Playing {...this.state} hash={hash} {...props} />}
              />
              <Route
                path="/browse"
                render={props => <Browse {...this.state} hash={hash} {...props} />}
              />
              <Route
                path="/submit"
                component={() => <Submit {...this.state} hash={hash} />}
              />
              <Route
                path="/connect"
                component={() => <Connect {...this.state} hash={hash} />}
              />
          </Switch>
          }
        </Router>
      </div>
    );
  }
}
