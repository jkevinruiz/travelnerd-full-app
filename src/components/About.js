import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class About extends React.Component {
	
	render() {
		return (
			<div className="banner">
				<div className="bannerBody">
					<h1>Travel Photos</h1>
					<section>
						<h3>About</h3>
						<p>My name is Ben and I am in Web III taught by Randy Connoly.</p>
						<p>This is an app that displays travel photos, allows you to edit their info, and keeps track of their information.</p>
					</section>
					<section>
						<h3>Thanks To...</h3>
						<ul>
							<li>Home & About photos from <a href="https://unsplash.com/photos/z6wdpf9fpM4">Jason Lam</a></li>
							<li>Travel images from the one and only Randy Connoly</li>
							<li>Image downloading code from <a href="https://stuk.github.io/jszip/documentation/examples/downloader.html">Stuart Knightley on GitHub</a></li>
							<li>Further image downloading stuff from <a href="https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141">sideshowbarker on StackOverflow</a></li>
							<li>Google Maps stuff from <a href="https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react">scotch.io</a></li>
							<li>Geolocation stuff from <a href="https://www.npmjs.com/package/react-geolocated">Dan Homola</a></li>
							<li>User distance calculations from <a href="https://www.movable-type.co.uk/scripts/latlong.html">Movable Type Scripts</a> and <a href="https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula">Stack Overflow</a></li>
						</ul>
					</section>
					<section>
						<h3>Apologies</h3>
						<ul>
							<li>This thing is incredibly ugly and I apologize for that</li>
						</ul>
					</section>
				</div>
			</div>
		);
	}
}

export default About;