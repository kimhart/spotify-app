export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "562c0c1d524e4040b18f97152a39a711";
export const redirectUri = "https://jw-spotify-app.netlify.com/";
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-follow-modify",
  "playlist-modify-public"
];

export const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});


