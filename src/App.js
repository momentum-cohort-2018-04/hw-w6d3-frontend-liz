import React, { Component } from 'react'
import './index.css'
import Photo from './Photo'
import Photos from './Photos'
import {} from 'dotenv/config'
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
    // this.photoStatus = this.photoStatus.bind(this)
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
  }

  // componentDidUpdate () {
  //   console.log('photoArrayupdate', this.state.photoArray)
  // }

  runSearch (event) {
    event.preventDefault()
    request
      .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${this.state.searchInput}`)
      .then(response => {
        let searchResults = response.body.results
        console.log(searchResults)
        this.setState({
          photoArray: searchResults})
        // this.getPhotoInfo(this.state.photoArray)
      })
    // this.setState({searchInput: ''})
  }

  expandPhoto (singlePhoto) {
    console.log('clicked')
    console.log(this.state.expandedPhotos)
    this.setState(prevState => {
      return { expandedPhotos: prevState.expandedPhotos.concat(singlePhoto) }
    // Need to concat? YES function takes previous state and then concat onto that. See Tweetshrink app.js line 60. DONE but keeping here for reference.
    })
  }

  // let photoStatus
  // if (this.state.expandedPhotos.contains singlePhoto.id) {
  // Don't forget to uncomment out the bind in the constructor
  // } else {

  // }

  render () {
    return (
      <div className='App'>
        <header>
          <h1>Pic Picker</h1>
        </header>
        <main>
          <form className='searchForm' onSubmit={this.runSearch}>
            <input className='searchInput' type='text' onChange={this.searchInputToState} />
            <button className='searchButton' type='submit'>Pick Pics</button>
          </form>
          <div className='photoDisplayArea'>
            {this.state.photoArray.map((singlePhoto, i) => (
              <div key={singlePhoto.id}>
                <img className='thumbnailDisplay' onClick={(event) => this.expandPhoto(singlePhoto)} src={singlePhoto.urls.thumb} />
              </div>
            ))
            }
            {/* {photoStatus} */}
            <div>
              {this.state.expandedPhotos.map((singlePhoto, i) => (
                // Function to access info associated with key?
                // OR use photo class and true false isExpanded?
                // OR only one photo can expand at a time
                <div key={singlePhoto.id}className='expandedPhotoDiv'>
                  {/* Add onClick funtion to above to take off of array */}
                  <img className='expandedPhoto' src={singlePhoto.urls.regular} />
                  <p className='userName'>Photo by: {singlePhoto.user.name}</p>
                </div>
              ))
              }
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App
