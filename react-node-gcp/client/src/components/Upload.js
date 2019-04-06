import React, { Component } from 'react';
import './Upload.css';
import HeaderApp from "./HeaderApp"
import ImageUpload from "./ImageUpload";

class Upload extends Component {
    render() {
        return (
            <div className="uploadContainer">
                <HeaderApp />

                <div className="formContainer">

                    <form className="uploadForm">
                        <ImageUpload />
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
                            
                            <label>latitude</label>
                            <input type="text" name="latitude" placeholder="latitude"/>

                            <label>longitude</label>
                            <input type="text" name="longitude" placeholder="longitude"/>
                        </span>
                         
                        <span>
                            <label>Camera</label>
                            <input type="text" name="camera" placeholder="camera"/>
                            
                            <label>Aperture</label>
                            <input type="text" name="aperture" placeholder="longitude"/>

                            <label> Exposure </label>
                            <input type="text" name="exposure" placeholder="exposure" />

                            <label> Focal Length </label>
                            <input type="text" name="focal" placeholder="focal" />

                            <label> Iso </label>
                            <input type="Number" name="iso" placeholder="iso"/>
                            <br/>
                            <button type="submit">addNewImage</button>   
                        </span>
                    </form>
                </div>
            </div>
                );
            }
        }
        
export default Upload;