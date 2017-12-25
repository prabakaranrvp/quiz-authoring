/*
File Name   : ImageView
Type        : Molecule (A Smaller part with few functionalities)
Description : Handles the image upload, display and deletion
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// style
import './css/ImageView.css';


export default class ImageView extends Component {
    constructor(props){
  	     super(props);
         this.handleChange = this.handleChange.bind(this);
         this.deleteImage = this.deleteImage.bind(this);
     }

     // Deletes the image | No Parameters
     deleteImage() {
         this.refs.imgPreview.style.backgroundImage = '#'
         this.props.update('#');
     }

     // Reads the selected image, display in the view and updates to parent | Parameter: file change event
     handleChange(e) {
         let input = e.currentTarget;
         if (input.value!=null && input.files && input.files[0]) {
             let reader = new FileReader();

             reader.onload =  (img) => {
                 this.refs.imgPreview.style.backgroundImage = "url('" + img.target.result + "')";
                 this.props.update(img.target.result);
                 input.value = null;
             }

             reader.readAsDataURL(input.files[0]);
         }
     }

     render() {
         let imgClass = (this.props.imageURI!=undefined && this.props.imageURI.indexOf('data')>=0)?'img':'no-img';
         return (
             <div className="div-imageview">
                 <button className="btn-img-upload"
                     onClick={() => this.refs.imgUpload.click()}>Upload Image</button>
                 <input type="file"
                     style={{display:'none'}}
                     ref="imgUpload"
                     accept="image/*"
                     onChange={this.handleChange} />
                 <div className={`div-imagePreview ${imgClass}`} ref="imgPreview" style={{backgroundImage:"url('" + this.props.imageURI + "')"}} >
                     <button className="btn-deleteImage" onClick={this.deleteImage}>Delete Image</button>
                 </div>
            </div>
        );
    }
}



ImageView.propTypes = {
    imageURI: PropTypes.string,
    update: PropTypes.func
}

ImageView.defaultProps = {
    imageURI: '#',
    update: function() {}
}
