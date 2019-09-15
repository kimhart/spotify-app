import React, { Component } from "react";
import { buildOptions } from "../../api";
import { Link } from "react-router-dom";
import TopNav from "../top-nav";

export default class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPlaybackState = () => {
    // purely to check if you're logged in -- could be refactored
    const { token, history } = this.props;
    fetch(`https://api.spotify.com/v1/me/player`, buildOptions(token, "GET"))
      .then((res) => {
        if (res.status === 401) {
          history.push('/login');
        } else if (res.status === 200) {
          this.setState({ error: false, success: true });
        }
      })
      .then(json => this.setState({ isPlaying: json.is_playing }))
      .catch(err => err)
  }

  addPlaylist = () => {
    const { token } = this.props;
    const { playlist } = this.state;

    fetch(`https://api.spotify.com/v1/playlists/${playlist}/followers`, buildOptions(token, "PUT", null, 'application/json' ))
      .then(res => res.status === 200 ? this.setState({ error: false, success: true }) : this.setState({ error: true, success: false }))
      .catch(err => {
        this.setState({ error: true, success: false });
        return err;
      });
  }

  handleLink = (e) => {
    const string = e.target.value.split('/')[4];
    if (string) {
      const id = string.split('?')[0];
      this.setState({ playlist: id });
    }
  }

  render() {
    const { error, success } = this.state;
    return (
      <div className="page page--submit">
        <TopNav {...this.props} active="submit" />
        <h1>Contribute a Playlist</h1>
        <div className="page-instructions">
          <h3>Instructions</h3>
          <div className="number">
            <span>1. </span>In Spotify, right-click on
            your playlist
          </div>
          <div className="number">
            <span>2. </span>Under the "Share"&nbsp; menu,
            select "Copy Playlist Link"
          </div>
          <div className="number">
            <span>3. </span>Paste link url&nbsp; below
          </div>
        </div>
        <div className="page--submit__note">
          Note: make sure your playlist is set to
          "Public" so it's followable
        </div>
        <div className="page--submit__input">
          <textarea placeholder="Playlist Link" onChange={this.handleLink} />
        </div>
        <div className="page--submit__feedback">
          {error && (
            <div className="page--submit__error">Sorry, we couldn't add that playlist.</div>
          )}
          {success && <div className="page--submit__success">Success! Check out your playlist on the <Link to={`/browse/${this.props.hash}`}>page</Link></div>}
        </div>
        <div className="page--submit__submit">
          <button className="button--primary" onClick={this.addPlaylist}>
            Submit Your Playlist
          </button>
        </div>
      </div>
    );
  }
}
