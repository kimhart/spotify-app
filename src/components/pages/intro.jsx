import React from "react";
import SoundwaveBadge from '../soundwave-badge';
import NavButton from '../nav-button';
import IconSubmit from '../icons/submit';
import { Link } from 'react-router-dom';

const Intro = (props) => {
  return (
    <div className="page page--intro">
      <section className="page-instructions">
        <h1>JWP Music System</h1>
        <h2>An app for controlling JW Spotify + Sonos within the office</h2>
        <h3>Basic Steps</h3>
        <div className="number">
          <span>1. </span>Open Spotify
        </div>
        <div className="number">
          <span>2. </span>Connect to Sonos speaker
        </div>
        <div className="number">
          <span>3. </span>
          <div>Remotely control music from this app on any device</div>
        </div>
        <Link to={`/connect/${props.hash}`}>
          <button className="button--primary">How to Connect</button>
        </Link>
      </section>
      <section className="page--intro__submit">
        <h4>
          Have a favorite playlist to contribute?
          <br /> If not, browse ours.
        </h4>
        <div>
          <Link to={`/submit/${props.hash}`}>
            <button className="button--primary"><IconSubmit /> Submit a Playlist</button>
          </Link>
          <NavButton link={`/browse/${props.hash}`} icon="browse" />
        </div>
      </section>
      <section className="page--intro__playing">
        <h4>Tap to see what's currently playing:</h4>
        <div className="page--intro__buttons">
          <Link to={`/playing/${props.hash}`}><SoundwaveBadge /></Link>
        </div>
      </section>
    </div>
  );
}

export default Intro;
