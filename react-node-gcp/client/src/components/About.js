import React from 'react';
import HeaderApp from './HeaderApp.js';
import memojiK from './images/memoji_kevin.png';
import memojiR from './images/memoji_rafael.png';

class About extends React.Component {

   /**
    * Renders/Displays website elements.
    */
    render() {
        return (
            <div>
                <HeaderApp />
                <div id="aboutBanner" className="banner">
                    <div className="aboutContent">
                        <h1>COMP 4513 Assignment 1</h1>
                        <p className="para1">
                            This is a website that demonstrates our understanding of how to generate a single-page application using React.
                        </p>
                        <h3>Team Members:</h3>
                        <div className="memojis">  
                            <a href="https://github.com/xDKevz" rel="noopener noreferrer" target="_blank">
                                <figure>
                                    <img src={memojiK} width="200" height="200" alt="Kevin" />
                                    <figcaption>John Kevin Ruiz</figcaption>
                                </figure>
                            </a>
                            
                            <a href="https://github.com/Rancelot" rel="noopener noreferrer " target="_blank">
                                <figure>
                                    <img src={memojiR} width="200" height="200" alt="Rafael" />
                                    <figcaption>Rafael Angelo Pucut</figcaption>
                                </figure>
                            </a>
                            <br></br>
                        </div>
                        <h3>CREDITS AND OTHER RESOURCES</h3>
                        <div>
                            <ul className="resources">
                                <li><a href="https://codepen.io/peternguyen/pen/hICga/">Favorites Toggle</a></li>
                                <li><a href="https://www.npmjs.com/package/google-maps-react">Google Maps React</a></li>
                                <li><a href="https://www.movable-type.co.uk/scripts/latlong.html">Haversine Formula JavaScript</a></li>
                                <li><a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en">CORS Extension</a></li>
                                <li><a href="https://stuk.github.io/jszip/documentation/examples/downloader.html">JSZip Helpful Code</a></li>
                                <li><a href="https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c">Uploading image from react to google buckets</a> </li>
                                <li><a href="https://github.com/b-bly/simple-mern-passport and https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669">For Authentication</a> </li>
                                <li><a href="https://docs.atlas.mongodb.com/driver-connection/"> Connecting to MongoDB Atlas </a></li>
                                <li><a href="https://www.tutorialkart.com/nodejs/mongoose/insert-document-to-mongodb/"> POST/Insert API request </a></li>
                                <li><a href="https://www.youtube.com/watch?v=v0t42xBIYIs&t=12s"> Video that showed how to use concurrent </a></li>
                                <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-capture"></a></li>
                            
                            </ul>
                        </div>
                        <h3>Technology use:</h3>
                        <div className="powered">
                            <p><a href="https://nodejs.org/en/"><img src="https://nodejs.org/static/images/logo.svg" width="200" height="200" alt="NodeJsLogo" /></a></p>
                            <p><a href="https://reactjs.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="200" height="200" alt="ReactLogo" /></a></p>
                            <p><a href="https://www.javascript.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" width="200" height="200" alt="JSLogo" /></a></p>
                            <p><a href="https://www.github.com/"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="200" height="200" alt="GithubLogo" /></a></p>
                            <p><a href="https://cloud.google.com/maps-platform/"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="200" height="200" alt="GoogleLogo" /></a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;