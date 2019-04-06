import React, { Component } from 'react';
import './Upload.css';
import HeaderApp from "./HeaderApp"

class Upload extends Component {

    handleUpload = () => {
        const filename = document.querySelector('#selectFile').files[0].name;
        document.querySelector('#upload').innerHTML = `<strong>${filename}</strong>`; 
    }


    render() {
        return (
            <div className="uploadContainer">
                <HeaderApp />
                <div className="formContainer">
                    <form className="uploadForm">
                        <span className="fileInput">
                            <label for="selectFile">Select File</label>
                            <input type="file" id="selectFile" onChange={this.handleUpload} accept="image/*"/>
                        </span>
                        <span className="photoInfo">
                            <h4><strong>Image Information</strong></h4>
                            <label>Title</label>
                            <input type="text" name="title"/>
                    
                            <label>City</label>
                            <input type="text" name="city"/>

                            <label>Country</label>
                            <input type="text" name="country"/> 
                            
                            <label>latitude</label>
                            <input type="text" name="latitude"/>

                            <label>longitude</label>
                            <input type="text" name="longitude"/>
                        </span>
                        <span className="description">
                            <label>Description</label>
                            <input id="desc" type="text" name="description" />
                        </span>
                        <span className="photoEXIF">
                            <h4><strong>EXIF Information</strong></h4>
                            <label>Camera</label>
                            <input type="text" name="camera"/>
                            
                            <label>Aperture</label>
                            <input type="text" name="aperture"/>

                            <label> Exposure </label>
                            <input type="text" name="exposure" />

                            <label> Focal Length </label>
                            <input type="text" name="Focal Length" />

                            <label> Iso </label>
                            <input type="Number" name="iso"/>   
                        </span> 
                        <div className="uploadBtns">
                            <p id="upload"></p>
                            <button className="btn" type="submit" value="upload">Upload</button>
                        </div>
                    </form> 
                </div>
                </div>
                );
            }
        }
        
export default Upload;
