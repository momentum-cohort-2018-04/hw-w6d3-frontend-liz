import React, { Component } from 'react'
import Photos from './Photos'
import App from './App'

class Photo extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='expandedPhotoDiv'>
        <p>Paragraph to make sure this part is still connected.</p>
        {/* <img className='expandedPhoto' src={this.props.urls.regular} /> */}
        {/* <p className='userName'>Photo by: {this.props.user.name}</p> */}
      </div>
    )
  }
}

export default Photo
