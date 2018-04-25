window.addEventListener('load', event => {

  console.log('Music Blog Client: ready to GO!');

  const baseURL = 'http://localhost:3002/api/artists/';
  const newArtistButtonEl = document.getElementById('new-artist');
  const allArtistsEl = document.getElementById('all-artist');
  const artistsListEl = document.createElement('ul');
  allPostsEl.appendChild(postsListEl);
  const focusPostEl = document.getElementById('focus-post');
  const deleteArtist = id => {
      axios.delete(`${baseURL}${id}`)
        .then(result => {
          focusPostEl.innerHTML = '';
          setTimeout(getAllArtists, 500);
        })
        .catch(error => { console.error(error); });
    }

    const updatePost = (event, id) => {
      const newTitle = document.getElementById('edit-artist-title').value;
      const newContent = document.getElementById('edit-artist-content').value;
      const newData = { title: newTitle, content: newContent };
      axios.put(`${baseURL}${id}`, newData)
        .then(result => {
          let update_id = result.data.id;
          focusPostEl.innerHTML = '';
          setTimeout(() => {
            getAllPosts();
            getOnePost(update_id);
          }, 500);
        })
        .catch(error => { console.error(error); });
      event.preventDefault();
    }

    const editPost = artist => {
      focusPostEl.innerHTML = '';
      const editPostFormEl = document.createElement('form');
      editPostFormEl.innerHTML = `
        <h4>Edit artist.</h4>
        <label>Title</label>
        <input type='text' id='edit-post-title' value='${artist.title}' />
        <br><br>
        <label>Content</label>
        <textarea id='edit-artist-content'>${artistpost.content}</textarea>
        <br><br>
        <button id='update-post'>Update.</button>`;
      focusPostEl.appendChild(editPostFormEl);
      document.getElementById('update-post').addEventListener('click', (event) => {
        event.preventDefault();
        updatePost(event, artist.id);
      });
    }

    const getOnePost = id => {
      axios.get( `${baseURL}${id}`)
        .then( response => {
          focusPostEl.innerHTML = '';
          const postTitleEl = document.createElement('h3');
          postTitleEl.innerHTML = response.data.title;
          const postContentEl = document.createElement('p');
          postContentEl.innerHTML = response.data.content;
          focusPostEl.appendChild(postTitleEl);
          focusPostEl.appendChild(postContentEl);
          const editButtonEl = document.createElement('button');
          editButtonEl.innerHTML = 'Edit.';
          editButtonEl.id = 'edit-post-button';
          focusPostEl.appendChild(editButtonEl);
          const deleteButtonEl = document.createElement('button');
          deleteButtonEl.innerHTML = 'Delete.';
          deleteButtonEl.id = 'delete-post-button';
          focusPostEl.appendChild(deleteButtonEl);
          editButtonEl.addEventListener('click', () => { editPost(response.data); });
          deleteButtonEl.addEventListener('click', () => { deletePost(response.data.id); });
         })
        .catch( error => { console.error(error); });
    }

    const createPost = event => {
      const title = document.getElementById('new-post-title').value;
      const content = document.getElementById('new-post-content').value;
      axios.post(`${baseURL}`, { title, content })
        .then( response => {
          getAllPosts();
          getOnePost(response.data.id);
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
          artistListEl.innerHTML = '';
          response.data.forEach( item => {
            let artistListItemEl = document.createElement('li');
            artistListItemEl.innerHTML = item.title;
            artistListItemEl.addEventListener('click', id => { getOneArtist(item.id); });
            artistsListEl.appendChild(artistListItemEl);
          })
        })
        .catch( error => { console.error(error); });
    }

    newArtistButtonEl.addEventListener('click', newArtist);
    getAllPosts();

  });
