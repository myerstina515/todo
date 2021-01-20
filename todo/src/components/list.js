import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList(props) {
console.log('this is props', props.list);
    return (
      <ListGroup>
        {props.list.map(item => (
          <ListGroup.Item data-testid="list-item" action variant={item.complete ? "success" : "danger"} className={`complete-${item.complete.toString()}`}
          key={item._id}>
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
}


export default TodoList;