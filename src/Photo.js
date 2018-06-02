import React, { Component } from 'react'
// import Photos from './Photos'
import App from './App'

class Photo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bigPhoto: props.expandedPhotos
    }
  }

  render () {
    console.log(this.state.bigPhoto)
    return (
      <div className='expandedPhotoDiv'>
        <p>Paragraph to make sure this part is still connected.</p>
        <img className='expandedPhoto' src={this.state.bigPhoto.urls.regular} />
        <p className='userName'>Photo by: {this.state.bigPhoto.user.name}</p>
      </div>
    )
  }
}

export default Photo
