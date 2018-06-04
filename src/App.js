import React, { Component } from 'react'
import './index.css'
import Photo from './Photo'
// import Photos from './Photos'
import {} from 'dotenv/config'
// Above is for your env file to work
import request from 'superagent'
import { runInThisContext } from 'vm'
import photoFetch from './photoFetch.png'

const accessKey = process.env.REACT_APP_ACCESS_KEY

class App extends Component {
  constructor (props) {
    super(props)
    this.state =
    {searchInput: '',
      photoArray: [],
      photosToDisplay: [],
      expandedPhoto: null,
      // expandedPhotoId: null,
      noSearchResults: ''
    }
    this.searchInputToState = this.searchInputToState.bind(this)
    this.runSearch = this.runSearch.bind(this)
    this.expandPhoto = this.expandPhoto.bind(this)
    this.categorySearch = this.categorySearch.bind(this)
    // this.expandPhotoHTML = this.expandPhotoHTML.bind(this)
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
    // console.log(this.state.searchInput)
  }

  categorySearch (event) {
    console.log('categorySearch run')
    this.setState({searchInput: event.target.value})
    this.runSearch(event)
  }

  runSearch (event) {
    event.preventDefault()
    console.log(this.state.searchInput)
    request
      .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${this.state.searchInput}`)
      .then(response => {
        let searchResults = response.body.results
        // console.log(searchResults)
        if (searchResults.length === 0) {
          this.setState({
            noSearchResults: 'Sorry, no photos were found.'
          })
        } else {
          this.setState({
            photoArray: searchResults})
          this.setState({
            noSearchResults: ''
          })
        }
      })
    // this.setState({searchInput: ''})
  }

  expandPhoto (singlePhoto) {
    // console.log('photoClicked')
    this.setState({expandedPhoto: singlePhoto})
    // this.setState({expandedPhotoId: singlePhoto.key})
  }

  // componentDidUpdate () {
  //   console.log('searchInputUpdate', this.state.searchInput)
  // }

  render () {
    return (
      <div className='App'>
        <header>
          <img className='headerImage' src={photoFetch} />
        </header>
        <main>
          <form className='searchForm' onSubmit={this.runSearch}>
            <input className='searchInput' type='text' placeholder='Search for images' onChange={this.searchInputToState} />
            <button className='searchButton' type='submit'>Fetch</button>
          </form>
          <div className='noSearchResultsMessageDiv'>
            <p>{this.state.noSearchResults}</p>
          </div>
          <div className='categories'>
            <h4>Or search by category:</h4>
            <button className='categorySearch' value='puppy' onClick={this.categorySearch}>Puppies</button>
            <button className='categorySearch' value='labrador' onClick={this.categorySearch}>Labradors</button>
            <button className='categorySearch' value='terrier' onClick={this.categorySearch}>Terriers</button>
            <button className='categorySearch' value='hound' onClick={this.categorySearch}>Hounds</button>
            <button className='categorySearch' value='mutt' onClick={this.categorySearch}>Mutts</button>
          </div>
          <div className='photoDisplayArea'>
            {this.state.photoArray.map((singlePhoto, i) => (
              <div key={singlePhoto.id}>
                <img className='thumbnailDisplay' onClick={(event) => this.expandPhoto(singlePhoto)} src={singlePhoto.urls.thumb} alt='thumbnail' />
                <Photo expandedPhoto={this.state.expandedPhoto} />
              </div>
            ))
            }
          </div>
        </main>
      </div>
    )
  }
}

export default App
