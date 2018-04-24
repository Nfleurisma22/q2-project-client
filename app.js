window.addEventListener('load', () => {
  const focusPost = document.querySelector('#focus-posts');
  const musicpostButton = document.querySelector('#postButton');

  const baseURL =  'http://localhost:3002/api/q2project';
  const getAllSongs= () => {
    const songsEl = document.createElement('ul');
    axios.get(`${baseURL}`)
    .then(response => {
      response.data.forEach(songs => {
        const songItemEl = document.createElement('li');
