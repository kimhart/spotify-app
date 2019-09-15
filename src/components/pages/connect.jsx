import React, { Component } from "react";
import DevicesIcon from '../icons/devices';
import TopNav from '../top-nav';
import { Link } from "react-router-dom";

export default class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App page page--connect">
        <TopNav {...this.props} active="connect" />
        <h1>Connect to Sonos</h1>
        <section className="page-instructions">
          <h3>Instructions</h3>
          <div className="number">
            <span>1. </span>Open the Spotify app on JW iPad
          </div>
          <div className="number">
            <span>2. </span>Tap the "Devices Available" icon
          </div>
          <div className="number">
            <span>3. </span>Select "More Devices" from the menu
          </div>
          <div className="number">
            <span>4. </span>Select "JW Sonos Speaker"
          </div>
          <div className="page--connect__images">
            <img
              alt="How to Connect Step 1"
              src={process.env.PUBLIC_URL + "/connect-step-1.png"}
            />
            <img
              alt="How to Connect Step 1"
              src={process.env.PUBLIC_URL + "/connect-step-2.png"}
            />
          </div>
          <a href="spotify://">
            <button className="button--primary">Open Spotify</button>
          </a>
        </section>
      </div>
    );
  }
}
