import React, { Component } from "react";
import { buildOptions } from "../../api.js";
import TopNav from "../top-nav";
import Loader from "../loader";
import config from "../../config.json";
import SoundwaveBadge from "../soundwave-badge";

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.getDevices();
    this.getPlaylists();
  }

  getPlaylists = () => {
    const { token, history } = this.props;
    fetch("https://api.spotify.com/v1/me/playlists?limit=50", buildOptions(token, "GET"))
      .then(res => {
        if (res.status === 401) {
          history.push('/login');
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => json ? this.setState({ playlists: json.items, isLoading: false }) : null)
      .catch(err => {
        history.push('/');
        return err;
    })
  }

  getDevices = () => {
    fetch(`https://api.spotify.com/v1/me/player/devices`, buildOptions(this.props.token, "GET"))
      .then(res => res.json())
      .then(json => {
        const iPad = json.devices.filter(device => device.name === "Monica's iPad")[0].id;
        this.setState({ device: iPad });
      })
      .catch(err => err)
  }

  startPlayback = (uri) => {
    const { token } = this.props;
    const { device } = this.state;
    fetch(`https://api.spotify.com/v1/me/player/play${device ? `?device_id=${device}` : ""}`,
      buildOptions(token, "PUT", {"context_uri": uri}))
      .then((res) => {
        if (res.status === 404) {
          alert("No active device found. (Make sure Spofity is open on the iPad!)");
        }
      })
      .catch(err => err);
  };

  alphabetize = playlists => playlists.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
  })

  openModal = (name, uri) => {
    this.setState({ 
      modalOpen: true, 
      modalText: name, 
      modalUri: uri
    })
  }

  closeModal = () => {
    this.setState({ 
      modalOpen: false,
      modalUri: ''
    });
  }

  playPlaylist = (uri) => {
    this.setState({ modalOpen: false });
    this.startPlayback(uri);
  }

  renderCuratedPlaylists = () => {
    const { playlists } = this.state;

    return config.categories.map((category, i) => {
      const catList = [];
      playlists.map(playlist => category.playlists.map(uri => uri === playlist.uri ? catList.push(playlist) : null));

      return (
        <div className="page--browse__category" key={i}>
          <h3>{category.name}</h3>
          <span>{category.description}</span>
          <div className="page--browse__playlists">
            {
              this.alphabetize(catList).map((playlist, i) => {
                return (
                  <div className="page--browse__playlist" key={i} onClick={e => this.openModal(playlist.name, playlist.uri)}>
                    <div key={i} className="page--browse__image" style={{ backgroundImage: `url('${playlist.images[0].url}')` }} />
                    <p>{playlist.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })
  }

  renderModal = () => {
    const { modalOpen, modalUri, modalText } = this.state;
    return (
      <div className={`page--browse__modal ${modalOpen ? "-is-open" : ""}`}>
        <div className="page--browse__modal-main">
          <SoundwaveBadge size="s" />
          <h2>Ready to play<br/>
          <strong>{modalText}</strong>?</h2>
          <div className="page--browse__modal-buttons">
            <div className="page--browse__modal-cancel" onClick={this.closeModal}>Cancel</div>
            <div className="page--browse__modal-play" onClick={() => this.playPlaylist(modalUri)}>
              Play
            </div>
          </div>
        </div>
      </div>
    );
  }

  listPlaylistNames = () => {
    const list = this.alphabetize(this.state.playlists);
    return list.map((playlist, i) => <p key={i} onClick={(e) => this.openModal(playlist.name, playlist.uri)} className="page--browse__playlist-name">{playlist.name}</p>)
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="page page--browse">
        {this.renderModal()}
        <TopNav {...this.props} active="browse" />
        <h1>Browse</h1>
        {isLoading && <div className="page--browse__loading"><Loader /></div>}
        {!isLoading &&
          <div className="page--browse__main">
            <div className="page--browse__curated">
              {this.renderCuratedPlaylists()}
            </div>
            <div className="page--browse__list">
              <h3>All Playlists</h3>
              { this.listPlaylistNames() }
            </div>
          </div>
        }
      </div>
    );
  }
}
