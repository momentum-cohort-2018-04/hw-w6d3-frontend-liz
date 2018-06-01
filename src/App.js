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
      photoDiv: [],
      thumbsToDisplay: []
      // openPhoto: ''
    }
    this.searchInputToState = this.searchInputToState.bind(this)
    this.runSearch = this.runSearch.bind(this)
    this.getPhotoInfo = this.getPhotoInfo.bind(this)
    // Not sure if I need the getPhotoInfo binding
  }

  searchInputToState (event) {
    this.setState({searchInput: event.target.value})
  }

  getPhotoInfo (photoDiv) {
    console.log(this.state.photoDiv)
    this.state.photoDiv.map((singlePhoto) => {
      let thumbnail = singlePhoto.urls.thumb
      let originalPhoto = singlePhoto.urls.regular
      let userName = singlePhoto.user.className
      
      console.log(thumbnail)
    })
  }

  // componentDidUpdate () {
  //   console.log('photodivupdate', this.state.photoDiv)
  // }

  runSearch (event) {
    event.preventDefault()
    // console.log(this.state.searchInput)
    request
      .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${this.state.searchInput}`)
      .then(response => {
        // console.log(response.body)
        // console.log('notbody', response.results)
        let searchResults = response.body.results
        console.log(searchResults)
        this.setState({
          photoDiv: searchResults})
        // console.log(this.state.searchInput)
        this.getPhotoInfo(this.state.photoDiv)
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
            <img src={this.state.thumbsToDisplay[i]} />
            {/* You left off on line above */}
          </div>
        </main>
      </div>
    )
  }
}

export default App
