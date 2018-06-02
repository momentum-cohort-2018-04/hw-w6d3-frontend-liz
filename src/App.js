import React, { Component } from 'react'
import './index.css'
import Photo from './Photo'
// import Photos from './Photos'
import {} from 'dotenv/config'
// Above is for your env file to work
import request from 'superagent'
import { runInThisContext } from 'vm'

const accessKey = process.env.REACT_APP_ACCESS_KEY

class App extends Component {
  constructor (props) {
    super(props)
    this.state =
    {searchInput: '',
      photoArray: [],
      photosToDisplay: [],
      expandedPhotos: []
    }
    this.searchInputToState = this.searchInputToState.bind(this)
    this.runSearch = this.runSearch.bind(this)
    this.expandPhoto = this.expandPhoto.bind(this)
    // this.expandPhotoHTML = this.expandPhotoHTML.bind(this)
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
  }

  runSearch (event) {
    event.preventDefault()
    request
      .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${this.state.searchInput}`)
      .then(response => {
        let searchResults = response.body.results
        console.log(searchResults)
        this.setState({
          photoArray: searchResults})
      })
    // this.setState({searchInput: ''})
  }

  expandPhoto (singlePhoto) {
    // console.log('photoClicked')
    this.setState({expandedPhotos: singlePhoto})
    let bigPhoto = new Photo(this.state.expandedPhotos)
    bigPhoto()
  }
  // <Photo bigPhoto={this.state.expandedPhotos} />
  componentDidUpdate () {
    console.log('expandedPhotosupdate', this.state.expandedPhotos)
  }

  // expandPhotoHTML (singlePhoto) {
  //   return this.state.expandedPhotos.html(
  //     <div className='expandedPhotoDiv'>
  //       <img className='expandedPhoto' src={singlePhoto.urls.regular} />
  //       <p className='userName'>Photo by: {singlePhoto.user.name}</p>
  //     </div>
  //   )
  // }

  render () {
    return (
      <div className='App'>
        <header>
          <h1>Photo Fetcher</h1>
        </header>
        <main>
          <form className='searchForm' onSubmit={this.runSearch}>
            <input className='searchInput' type='text' placeholder='Search for images' onChange={this.searchInputToState} />
            <button className='searchButton' type='submit'>Fetch</button>
          </form>
          <div className='photoDisplayArea'>
            {this.state.photoArray.map((singlePhoto, i) => (
              <div key={singlePhoto.id}>
                <img className='thumbnailDisplay' onClick={(event) => this.expandPhoto(singlePhoto)} src={singlePhoto.urls.thumb} />
              </div>
            ))
            }
            <Photo />
          </div>
        </main>
      </div>
    )
  }
}

export default App
