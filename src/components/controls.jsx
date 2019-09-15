import React, { Component } from "react";
import NextIcon from "./icons/next";
import PreviousIcon from "./icons/previous";
import PauseIcon from "./icons/pause";
import PlayIcon from "./icons/play";
import { buildOptions } from "../api.js";

export default class AudioControls extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getSong = setInterval(() => this.getPlaybackState(), 5000);
  }

  componentDidMount() {
    this.getPlaybackState();
  }

  componentWillUnmount() {
    clearInterval(this.getSong);
  }

  getPlaybackState = () => {
    const { token, setPlaybackState, history } = this.props;
    fetch(`https://api.spotify.com/v1/me/player`, buildOptions(token, "GET"))
      .then(res => {
        if (res.status === 401) {
          history.push('/login');
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        this.setState({ isPlaying: json.is_playing });
        setPlaybackState(json.is_playing)
      })
      .catch (err => err)
  }

  startPlayback = () => {
    const { token, device, setPlaybackState } = this.props;
    fetch(`https://api.spotify.com/v1/me/player/play${device ? `?device_id=${device}` : ""}`,
      buildOptions(token, "PUT"))
      .then((res) => {
        if (res.status === 404) {
          alert("No active device found. (Make sure Spofity is open on the iPad!)")
        } else {
          this.setState({ isPlaying: true });
          setPlaybackState(true);
        }
      })
      .catch(err => err);
  };

  pausePlayback = () => {
    const { token, setPlaybackState } = this.props;
    fetch("https://api.spotify.com/v1/me/player/pause", buildOptions(token, "PUT"))
      .then(() => {
        this.setState({ isPlaying: false });
        setPlaybackState(false);
      })
      .catch(err => err);
  };

  skipToNextTrack = () => {
    const { token, changeSong } = this.props;
    fetch(`https://api.spotify.com/v1/me/player/next`, buildOptions(token, "POST"))
      .then(() => changeSong())
      .catch(err => err);
  }

  skipToPreviousTrack = () => {
    const { token, changeSong } = this.props;
    fetch(`https://api.spotify.com/v1/me/player/previous`, buildOptions(token, "POST"))
      .then(() => changeSong())
      .catch(err => err);
  }

  renderPlayOrPause = () => {
    if (this.state.isPlaying) {
     return (
      <button className="audio-controls__button" onClick={this.pausePlayback}>
        <div className="audio-controls__inner"><PauseIcon /></div>
      </button>
     )
    } else {
      return (
        <button className="audio-controls__button" onClick={this.startPlayback}>
          <div className="audio-controls__inner"><PlayIcon /></div>
        </button>
      );
    }
  }

  render() {
    return (
      <div className="audio-controls">
        <button className="audio-controls__button -secondary" onClick={this.skipToPreviousTrack}>
          <PreviousIcon />
        </button>
        {this.renderPlayOrPause()}
        <button className="audio-controls__button -secondary" onClick={this.skipToNextTrack}>
          <NextIcon />
        </button>
      </div>
    );
  }
};
