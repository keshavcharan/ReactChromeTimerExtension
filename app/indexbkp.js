import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
	render() {
		return(
		    <div class="row">
		    	<div class="col-lg-4 col-md-4 col-sm-12">
				    <h4 class="feature-title">NEXT, I wanna complete </h4>
				    <div class="form-group">
				    	<textarea class="form-control" maxlength="300"></textarea>
				    </div>
					<div>
						<h4>in </h4> 
						<form id="nonameform" action="running.html" method="POST">
							<div class="center-block">
								<input id="hours_val" type="text" inputmode="numeric" placeholder="1"/>
								<select id="hours_type"> 
									<option value="Hours">Hours</option> 
									<option value="Minutes"> Minutes </option>
								</select>
								<button type="submit" class="btn btn-primary">Set</button>
							</div>
						</form>
					</div>
				</div>	
			</div>
		) 
	}
}

ReactDOM.render(<App/>, document.getElementById('app'))