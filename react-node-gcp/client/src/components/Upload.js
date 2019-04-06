import React, { Component } from 'react';
import './Upload.css';
import HeaderApp from "./HeaderApp"

class Upload extends Component {
    render() {
        return (
            <div className="uploadContainer">
                <HeaderApp />
                <div className="formContainer">
                    <form className="uploadForm">
                        <label>Title</label>
                       <span><input type="text" name="title" placeholder="title"/> </span> 
                        <br></br>
                        <label>Description</label>
                        <input type="text" name="description" placeholder="description" />
                        <br></br>
                        <span>
                            <label>City</label>
                            <input type="text" name="city" placeholder="city"/>

                            <label>Country</label>
                            <input type="text" name="country" placeholder="country"/>
                        </span>
                        <span>
                            <label>latitude</label>
                            <input type="text" name="latitude" placeholder="latitude"/>

                            <label>longitude</label>
                            <input type="text" name="longitude" placeholder="longitude"/>
                        </span>     
                    </form>
                </div>
                <div className="uploadBtns">
                    <button value="selectImage">Select Image</button>
                    <button type="submit" value="upload">Upload</button>
                    <button value="addNewImage">addNewImage</button>
                </div>
                </div>
                );
            }
        }
        
export default Upload;