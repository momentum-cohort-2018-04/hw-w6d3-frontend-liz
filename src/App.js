import React, { Component } from 'react'
import './App.css'
import Photo from './Photo'
import Photos from './Photos'
import {} from 'dotenv/config'
import response from 'superagent'

const accessKey = process.env.REACT_APP_ACCESS_KEY
console.log(accessKey)

class App extends Component {
  // state will hold whether or not photo is expanded
  runSearch (formInput) {
    formInput.preventDefault()
    request
      .get(`https://api.unsplash.com/search/photos/?client_id=${accessKey}`)
      .then(response => {

      })
  }

  // $('#search').on('submit', (e) => {
  //   e.preventDefault()
  //   const search = $('#input').val().split(' ').join('+')
  //   $('div').removeClass('hidden')
  //   $('#input').blur()
  //   request
  //     .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=16e988fdeac45c2f91be93eb25384173&text=${search}&per_page=6&page=1&format=json&nojsoncallback=1&media=photos`)
  //     .then(response => {
  //       $('#flickr-photo-display-area').html('')
  //       let searchResults = response.body.photos.photo
  //       getPhotoInfo(searchResults)
  //       $('#flickr-photo-display-area').html(`<p class="iconline"><i class="subicon fab fa-flickr"></i> on Flickr</p><a href="https://www.flickr.com/search/?tags=${search}">${htmlToPage.join('')}</a>`)
  //     })
  //   document.getElementById('search').reset()
  // })

  render () {
    return (
      <div className='App'>
        <header>
          <h1>Pic Picker</h1>
        </header>
        <main>
          <form className='searchForm'>
            <input type='text' />
            <button className='searchButton' onSubmit={runSearch}>Pick Pics</button>
          </form>
        </main>
      </div>
    )
  }
}

export default App
