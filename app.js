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
      const newName = document.getElementById('edit-artist-name').value;
      const newCountry = document.getElementById('edit-artist-country').value;
      const newData = { name: newName, country: newCountry };
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
        <label>name</label>
        <input type='text' id='edit-post-name' value='${artist.name}' />
        <br><br>
        <label>country</label>
        <textarea id='edit-artist-country'>${artist.country}</textarea>
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
          const artistNameEl = document.createElement('h3');
          artistNameEl.innerHTML = response.data.name;
          const artistCountryEl = document.createElement('p');
          artistCountryEl.innerHTML = response.data.country;
          focusArtistEl.appendChild(artistNameEl);
          focusArtistEl.appendChild(artistCountryEl);
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
      const name = document.getElementById('new-artist-name').value;
      const country = document.getElementById('new-artist-country').value;
      axios.post(`${baseURL}`, { name, country })
        .then( response => {
          getAllArtists();
          getOneArtist(response.data.id);
        })
        .catch( error => { console.error( error ); });
      event.preventDefault();
    }

    const newArtist = () => {
      console.log('newArtistFunction');
      const newArtistFormEl = document.createElement('form');
      newArtistFormEl.innerHTML = `<h4>New artist.</h4>
        <label>name</label>
        <input type='text' id='new-artist-name' />
        <br><br>
        <label>country</label>
        <textarea id='new-artist-country'></textarea>
        <br><br>
        <button id='create-artist'>Submit.</button>`;
      focusArtistEl.innerHTML = '';
      focusArtistEl.appendChild(newArtistFormEl);
      document.getElementById('create-artist').addEventListener('click', createArtist);
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

    newArtistButtonEl.addEventListener('click', newArtist);
    getAllArtists();

  });
