import React, { Component } from 'react';
import './Upload.css';
import axios from 'axios';

const uuidv4 = require('uuid/v4');

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                title: null,
                description: null,
                
                city: null,
                country: null,
                latitude: null,
                longitude: null,
                
                make: null,
                aperture: null,
                exposure_time: null,
                focal_length: null,
                exifiso: null

            }
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        let fields = this.state.fields;
        for(let property in fields ) {
            formData.append(property, fields[property]);
        }
        formData.append('filename', this.props.filename.name);

        console.log(fields);
        console.log(formData.entries);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        axios.post("/api/image/" + uuidv4(), formData, config)
            .then((response) => {
                alert("Added image to database");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChange = (e) => {
        let fields = {...this.state.fields};
        fields[e.currentTarget.name] = e.target.value;
        this.setState({
            fields
        })
    }

    render() {
        return (
                <div className="formContainer">
                    <form className="uploadForm" onSubmit={this.onFormSubmit}>
                        <span className="photoInfo">
                            <label>Title</label>
                            <span><input type="text" name="title" placeholder="title" onChange={this.onChange} /> </span> 
            
                            <label>City</label>
                            <input type="text" name="city" placeholder="city" onChange={this.onChange}/>

                            <label>Country</label>
                            <input type="text" name="country" placeholder="country" onChange={this.onChange}/> 
                            
                            <label>latitude</label>
                            <input type="number" name="latitude" placeholder="latitude" onChange={this.onChange}/>

                            <label>longitude</label>
                            <input type="number" name="longitude" placeholder="longitude" onChange={this.onChange}/>
                        </span>
                        <span className="description">
                            <label>Description</label>
                            <input type="text" name="description" placeholder="description" id="desc" onChange={this.onChange}/>
                        </span>
                        <span className="exifInfo">
                            <label>Camera</label>
                            <input type="text" name="make" placeholder="make" onChange={this.onChange}/>
                            
                            <label>Aperture</label>
                            <input type="text" name="aperture" placeholder="aperture" onChange={this.onChange}/>

                            <label> Exposure </label>
                            <input type="text" name="exposure_time" placeholder="exposure" onChange={this.onChange}/>

                            <label> Focal Length </label>
                            <input type="text" name="focal_length" placeholder="focal" onChange={this.onChange}/>

                            <label> Iso </label>
                            <input type="Number" name="exifiso" placeholder="iso" onChange={this.onChange}/>
                            <br/>  
                        </span>
                        <span className="addImage">
                            <button type="submit" id="addImage">Add Image</button>
                        </span> 
                    </form>
                </div>
                );
            }
        }
        
export default Upload;
