
// Credit to
// https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
import React from 'react';
import Upload from './Upload';
import HeaderApp from "./HeaderApp"
import './ImageUpload.css';
const axios = require('axios');



class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
            fileChosen: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        formData.append('image',this.state.file);
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post("/api/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
        document.querySelector('.btn').style.display = "block";
        document.querySelector('#fileName').innerHTML = `<strong>${e.target.files[0].name}</strong>`;
        document.querySelector('#fileName').style.color = "black";
    }

    render() {
        return (
            <div>
                <HeaderApp />
                <div className="uploadContainer">
                    <div className="formContainer fileInput" >            
                        <form onSubmit={this.onFormSubmit} className="formStyle">
                            <input type="file" name="image" onChange={this.onChange} id="fileUpload" accept="image/*"/>
                            <label for="fileUpload" id="label">Select an Image to Upload</label>
                            <p id="fileName"></p>
                            <button className="btn" type="submit">Upload</button>
                        </form>
                        <Upload filename={this.state.file} />
                    </div>
                </div>
            </div>
        )
        }
}

export default ImageUpload