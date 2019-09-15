export const buildOptions = (token, method, body, type) => {
  return {
    method: method,
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': type || 'text/plain'
    },
    body: JSON.stringify(body)
  };
}

export const handleShuffle = (token, state) => {
  fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, buildOptions(token, "PUT"))
    .catch(err => err);
};
