import React, { Component } from 'react';

class OptionMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {options: [{key : 'Hours', value : 'Hours'}, {key : 'Minutes', value : 'Minutes'}]};
	}

	render() {
		var opts = this.state.options.map(function(opt) {
			return (
				<option value={opt.value}> {opt.key} </option>
				);
		});

		return(
			<select id="hours_type"> 
				{opts}
			</select>
		)
	}
}

export default OptionMenu;