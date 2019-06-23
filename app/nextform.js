import Button from 'react-bootstrap'
import Form from 'react-bootstrap'


class NextFormDetails extends React.Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Label> NEXT, I wanna complete </Form.Label>
					<Form.Control as="textarea" maxlength="300"/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
	}
}