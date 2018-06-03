import React, { Component } from 'react'
// import Photos from './Photos'
import App from './App'

class Photo extends Component {

  render () {
    console.log(this.props.expandedPhotos)
    return (
      <div>
        <div className='expandedPhotoDiv'>
          <p>Paragraph to make sure this part is still connected.</p>
          <img className='expandedPhoto' src={this.props.expandedPhotos.urls.regular} />
          <p className='userName'>Photo by: {this.props.expandedPhotos.user.name}</p>
        </div>
      </div>
    )
  }
}

export default Photo
