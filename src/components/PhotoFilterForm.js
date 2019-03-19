import React from 'react';

class PhotoFilterForm extends React.Component {
	
	handleCountryFilter = e => {
		this.props.filterCountry(e.currentTarget.value);
	}
	
	handleCityFilter = e => {
		this.props.filterCity(e.currentTarget.value);
	}
	
	render() {
		return (
			<form className="photoFilter">
				<legend>Filter Photos</legend>
				<label>Country</label>
				<input
					type='text' 
					name='country'
					onChange={this.handleCountryFilter}
				/>
				<label>City</label>
				<input
					type='text' 
					name='city' 
					onChange={this.handleCityFilter}
				/>
			</form>
		);
	}
}

export default PhotoFilterForm;