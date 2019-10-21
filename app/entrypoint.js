import Routes from './routes.js'
import  { FirebaseContext } from './firebase/firebaseInstance.js';
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class EntryPoint extends React.Component {

	constructor(props){
		super(props)
	}
	
	render() {
	    console.debug('in entrypoint.js');
	    const styles= {
	    	row: {
	    		paddingTop:20,
	    		paddingBottom:20
	    	}
	    }

		return (
			<Container fluid="true">
				<Row style={styles.row}>
				    <Col></Col>
				    <Col sm={9} md={9}>
				    	<Routes firebaseClass={this.props.firebaseclass}/>
				    </Col>
				    <Col></Col>
			    </Row>
			</Container>
		)
	}
}
