import React from 'react';

class ImageUpload extends React.Component {
    fileSelectedHandler = event => {
        console.log(event);
    }
    
    
    render() {
        return (
            <div className="upload">
                <input type="file" onChange={this.fileSelectedHandler}/>
            </div>
        );
    }














}