import React, { Component } from 'react'
import './App.css'
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
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
  }

  // getPhotoInfo (photoArray) {
  //   console.log(this.state.photoArray)
  //   this.state.photoArray.map((singlePhoto) => {
  //     console.log(singlePhoto)
  // let thumbnail = singlePhoto.urls.thumb
  // let originalPhoto = singlePhoto.urls.regular
  // let userName = singlePhoto.user.name
  // let photoToHTML = <div className='photoDiv'>
  //   <img className='thumbOnPage' src={thumbnail} /></div>
  // this.state.photosToDisplay.concat(photoToHTML)
  // console.log(this.state.photosToDisplay)
  // this.setState({ photosToDisplay: photoToHTML
  // })
  //   })
  // }

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
                <img className='thumbnailDisplay' src={singlePhoto.urls.thumb} />
                <button className='expandButton'>Expand Photo</button>
                <div class='expandPhoto hidden'>
                  <img classname='expandedPhoto' src={singlePhoto.urls.regular} />
                  <p className='userName'>Photo by: {singlePhoto.user.name}</p>

                </div>
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
