window.addEventListener('load', event => {

  console.log('Music Blog Client: ready to GO!');

  const baseURL = 'http://localhost:3002/artists/';
  const newArtistButtonEl = document.getElementById('new-artist');
  const allArtistsEl = document.getElementById('all-artist');
  const artistsListEl = document.createElement('ul');
  allArtistsEl.appendChild(artistsListEl);
  const focusArtistEl = document.getElementById('focus-artist');
  const deleteArtist = id => {
      axios.delete(`${baseURL}${id}`)
        .then(result => {
          focusArtistEl.innerHTML = '';
          setTimeout(getAllArtists, 500);
        })
        .catch(error => { console.error(error); });
    }

    const updateArtist = (event, id) => {
      const newTitle = document.getElementById('edit-artist-title').value;
      const newContent = document.getElementById('edit-artist-content').value;
      const newData = { title: newTitle, content: newContent };
      axios.put(`${baseURL}${id}`, newData)
        .then(result => {
          let update_id = result.data.id;
          focusArtistEl.innerHTML = '';
          setTimeout(() => {
            getAllArtists();
            getOneArtist(update_id);
          }, 500);
        })
        .catch(error => { console.error(error); });
      event.preventDefault();
    }

    const editArtist = artist => {
      focusArtistEl.innerHTML = '';
      const editArtistFormEl = document.createElement('form');
      editArtistFormEl.innerHTML = `
        <h4>Edit artist.</h4>
        <label>Title</label>
        <input type='text' id='edit-post-title' value='${artist.title}' />
        <br><br>
        <label>Content</label>
        <textarea id='edit-artist-content'>${artistpost.content}</textarea>
        <br><br>
        <button id='update-artist'>Update.</button>`;
      focusArtistEl.appendChild(editArtistFormEl);
      document.getElementById('update-artist').addEventListener('click', (event) => {
        event.preventDefault();
        updateArtist(event, artist.id);
      });
    }

    const getOneArtist = id => {
      axios.get( `${baseURL}${id}`)
        .then( response => {
          focusArtistEl.innerHTML = '';
          const artistTitleEl = document.createElement('h3');
          artistTitleEl.innerHTML = response.data.name;
          const artistContentEl = document.createElement('p');
          artistContentEl.innerHTML = response.data.country;
          focusArtistEl.appendChild(artistTitleEl);
          focusArtistEl.appendChild(artistContentEl);
          const editButtonEl = document.createElement('button');
          editButtonEl.innerHTML = 'Edit.';
          editButtonEl.id = 'edit-artist-button';
          focusArtistEl.appendChild(editButtonEl);
          const deleteButtonEl = document.createElement('button');
          deleteButtonEl.innerHTML = 'Delete.';
          deleteButtonEl.id = 'delete-artist-button';
          focusArtistEl.appendChild(deleteButtonEl);
          editButtonEl.addEventListener('click', () => { editArtist(response.data); });
          deleteButtonEl.addEventListener('click', () => { deleteArtist(response.data.id); });
         })
        .catch( error => { console.error(error); });
    }

    const createArtist = event => {
      const title = document.getElementById('new-artist-title').value;
      const content = document.getElementById('new-artist-content').value;
      axios.post(`${baseURL}`, { title, content })
        .then( response => {
          getAllArtists();
          getOneArtist(response.data.id);
        })
        .catch( error => { console.error( error ); });
      event.preventDefault();
    }

    const newArtist = () => {
      const newArtistFormEl = document.createElement('form');
      newArtistFormEl.innerHTML = `<h4>New artist.</h4>
        <label>Title</label>
        <input type='text' id='new-artist-title' />
        <br><br>
        <label>Content</label>
        <textarea id='new-artist-content'></textarea>
        <br><br>
        <button id='create-artist'>Submit.</button>`;
      focusArtistEl.innerHTML = '';
      focusArtistEl.appendChild(newArtistFormEl);
      document.getElementById('create-artist').addEventListener('click', createPost);
    }

    const getAllArtists= () => {
      axios.get( baseURL )
        .then( response => {
          artistsListEl.innerHTML = '';
          response.data.forEach( item => {
            let artistListItemEl = document.createElement('li');
            artistListItemEl.innerHTML = item.name;
            artistListItemEl.addEventListener('click', id => { getOneArtist(item.id); });
            artistsListEl.appendChild(artistListItemEl);
          })
        })
        .catch( error => { console.error(error); });
    }

    //newArtistButtonEl.addEventListener('click', newArtist);
    getAllArtists();

  });
