import React, { Component } from 'react'
// import Photos from './Photos'
import App from './App'

// class Photo extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       expandedPhotos: props.expandedPhotos
//     }
//   }

function Photo (props) {
  const expandedPhoto = props.expandedPhotos
  // }
  // render () {
  //   console.log(this.state.expandedPhotos)
  return (
    <div>
      {expandedPhoto.length > 0 &&
      <div className='expandedPhotoDiv'>
        <p>Paragraph to make sure this part is still connected.</p>
        <img className='expandedPhoto' src={this.state.expandedPhotos.urls.regular} />
        <p className='userName'>Photo by: {this.state.expandedPhotos.user.name}</p>
      </div>}
    </div>
  )
}
// }

export default Photo
