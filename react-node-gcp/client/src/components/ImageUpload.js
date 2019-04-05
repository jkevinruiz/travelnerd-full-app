import React from 'react';
import axios from 'axios';


class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        // temp backup copy of photos
        this.state = { selectedFile: null};
      }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name
        })
    }

    fileUploadHandler = () => {
        
    }
    
    
    render() {
        return (
            <div className="upload">
                <input type="file" onChange={this.fileSelectedHandler}/>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }

}

export default ImageUpload;