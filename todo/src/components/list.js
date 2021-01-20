import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Badge from "react-bootstrap/Badge";


function TodoList(props) {
console.log('this is props', props.list);
    return (
<>
      {props.list.map((item) => (
        <Modal.Dialog>
          <Modal.Header closeButton onClick={() => props.handleDelete(item._id)}>
            <Modal.Title>
              {item.complete ? (
                <Badge pill variant="success">
                Complete
              </Badge>
            ) : (
              <Badge pill variant="danger">
                Pending
              </Badge>
            )}
              {item.assignee}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          </Modal.Body>
        </Modal.Dialog>
      ))}
    </>
  );


      // <ListGroup>
      //   {props.list.map((item) => (
      //     <ListGroup.Item data-testid="list-item" action variant={item.complete ? "success" : "danger"} className={`complete-${item.complete.toString()}`}
      //     key={item._id}>
      //       <span onClick={() => props.handleComplete(item._id)}>
      //         {item.text}
      //       </span>
      //     </ListGroup.Item>
      //   ))}
      // </ListGroup>
    // );
}


export default TodoList;