
// Credit to
// https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
import React from 'react';
import Upload from './Upload';
import HeaderApp from "./HeaderApp"
const axios = require('axios');


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null
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
    }

    render() {
        return (
            <div>
                <HeaderApp />
                <div className="uploadContainer">
                    <div className="formContainer">            
                        <form onSubmit={this.onFormSubmit}>
                            <h1>Image Upload</h1>
                            <input type="file" name="image" onChange= {this.onChange} />
                            <button type="submit">Upload</button>
                        </form>
                        <Upload filename={this.state.file} />
                    </div>
                </div>
            </div>
            

        )
        }
}

export default ImageUpload