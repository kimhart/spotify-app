import React, { Component } from 'react';
import { buildOptions } from '../../api.js';
import { Link } from "react-router-dom";
import TopNav from "../top-nav";
import SoundwaveBadge from "../soundwave-badge";
import AudioControls from "../controls";
import Loader from "../loader";

export default class Playing extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.getSong = setInterval(() => this.getCurrentTrack(), 5000);
  }

  componentDidMount() {
    this.getPlaybackState();
    this.getCurrentTrack();
    this.getDevices();
  }

  componentWillUnmount() {
    clearInterval(this.getSong);
  }

  getCurrentTrack = () => {
    const { token, history } = this.props;
    fetch("https://api.spotify.com/v1/me/player/currently-playing", buildOptions(token, "GET"))
      .then(res => {
        if (res.status === 401 || res.status === 404) {
          history.push('/login');
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        this.setState({ currentTrack: json, isLoading: false })
        this.getPlaylist(json ? json.context.uri : null);
      })
      .catch(err => err)
  }

  getPlaybackState = () => {
    const { token } = this.props;
    fetch(`https://api.spotify.com/v1/me/player`, buildOptions(token, "GET"))
      .then(res => res.json())
      .then(json => this.setState({ isPlaying: json.is_playing }))
      .catch(err => err)
  }

  getDevices = () => {
    fetch(`https://api.spotify.com/v1/me/player/devices`, buildOptions(this.props.token, "GET"))
      .then(res => res.json())
      .then(json => {
        const iPad = json.devices.filter(device => device.name === "JW Player iPad")[0].id;
        this.setState({ device: iPad });
      })
      .catch(err => err)
  }

  setPlayback = (isPlaying) => this.setState({ isPlaying });

  // this is a hack, needs to wait until the song change is complete
  updateSongDisplay = () => setTimeout(() => this.getCurrentTrack(), 100);

  getPlaylist = (uri) => {
    const playlistId = uri.split(':').pop();
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, buildOptions(this.props.token, "GET"))
      .then(res => res.status === 200 ? res.json() : null)
      .then(json => this.setState({ playlist: json.name }))
      .catch(err => err);
  }

  render() {
    const { currentTrack, playlist, isLoading, isPlaying } = this.state;
    const { hash } = this.props;
    return (
      <div className={`page page--playing`}>
        <TopNav {...this.props} active="playing" />
        {!isLoading && !currentTrack && 
          <div className="page--playing__dormant">
            <h1>It's quiet in here...</h1>
            <h3>Nothing's playing right now.</h3>
          <Link to={`/browse/${hash}`}><button className="button--primary">Browse Playlists</button></Link>
          </div>
        }
        { isLoading && <div className="page--playing__loading"><Loader /></div>}
        {!isLoading && currentTrack && currentTrack.item &&
          <div className="page--playing__main">
            { playlist && 
              <div className="page--playing__playlist">
                <h3>Playlist:</h3>
                <h2>{playlist}</h2>
              </div>
            }
            <div className="page--playing__display">
              <div className="page--playing__album-art">
                <SoundwaveBadge />
                <div className={`page--playing__record ${isPlaying ? '-spinning' :''}`} style={{backgroundImage: `url(${currentTrack.item.album.images[0].url})`}} />
                <div className="page--playing__record-arm">Currently Playing</div>
                <AudioControls {...this.state} {...this.props} setPlaybackState={this.setPlayback} changeSong={this.updateSongDisplay}/>
              </div>
              <div className="page--playing__artist">
                <h3>Artist:</h3>
                <h1>{currentTrack.item.artists.map(artist => artist.name).join(", ")}</h1>
                <h3>Title:</h3>
                <h5>{currentTrack.item.name}</h5>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
