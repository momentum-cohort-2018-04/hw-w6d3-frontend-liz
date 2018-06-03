import React, { Component } from 'react'
// import Photos from './Photos'
import App from './App'

class Photo extends Component {
  render () {
    return (
      <div>
        {this.props.expandedPhoto !== null &&
        <div>
          <div className='expandedPhotoDiv'>
            <img className='expandedPhoto' src={this.props.expandedPhoto.urls.regular} />
            <p className='attribution'>Photo by {this.props.expandedPhoto.user.name} on <a href={this.props.expandedPhoto.links.photos}>Unsplash</a> </p>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Photo
