import React, { Component } from 'react'
import './App.css'
import Photo from './Photo'
import Photos from './Photos'
import {} from 'dotenv/config'
import request from 'superagent'
import { runInThisContext } from 'vm';

const accessKey = process.env.REACT_APP_ACCESS_KEY

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {searchInput: ''}
    this.searchInputToState = this.searchInputToState.bind(this)
    this.runSearch = this.runSearch.bind(this)
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
  }
  // state will hold whether or not photo is expanded
  runSearch (event) {
    event.preventDefault()
    console.log(this.state.searchInput)
    request
      .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${this.state.searchInput}`)
      .then(response => {
        console.log(response.body)
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
          <form className='searchForm' onSubmit={this.runSearch}>
            <input className='searchInput' type='text' value={this.state.searchInput} onChange={this.searchInputToState} />
            <button className='searchButton' type='submit'>Pick Pics</button>
            {console.log(this.state.searchInput)}
          </form>
        </main>
      </div>
    )
  }
}

export default App
