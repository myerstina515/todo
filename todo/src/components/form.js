import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function TodoForm(props) {

  const [item, setState] = useState({});

  const handleInputChange = e => {
    setState({ ...item, [e.target.name]: e.target.value });
    console.log('item in handleInputChange', item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log('this is the item', item);
    props.handleSubmit(item);
    setState({});
  };
  return (
    <>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Add To Do Item</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>To Do Item</Form.Label>
            <Form.Control name="text" type="text" placeholder="Add To Do List Item" onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group>
          <Form.Control defaultValue={1} type="range" min={1} max={5} name="difficulty" onChange={handleInputChange}></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">Add Item</Button>
        </Form>
    </>
  );

}

export default TodoForm;