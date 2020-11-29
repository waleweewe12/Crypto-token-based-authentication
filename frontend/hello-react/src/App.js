import './App.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
function App() {
  return (
    <div >
      <Col  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%'
    }}>
    <Card border="secondary" >
  <Card.Header as="h5" >LOGIN</Card.Header>
  <Card.Body>
  <Form>
  <Form.Group controlId="FormUsername">
    <Form.Label>USERNAME</Form.Label>
    <Form.Control type="username" placeholder="Username" />
  
  </Form.Group>

  <Form.Group controlId="FormPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Container>
  <Row>
    <Col md={4}>
    <Button variant="primary"  type="login">
    Login
  </Button>
    </Col>
    <Col md={{ span: 4, offset: 4 }} > <Button variant="success" type="regis" >
    REGISTER
  </Button></Col>
  </Row>

</Container>


</Form>
  </Card.Body>
</Card>

      </Col>
    </div>
  );
}

export default App;
