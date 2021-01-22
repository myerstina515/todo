import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { AppSettingsContext } from '../context/settings/context';
import useAjaxCalls from './hooks/ajax';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';


function TodoList(props) {

  const [URL, list, setList, addItem] = useAjaxCalls();
  const appSettingsContext = useContext(AppSettingsContext);
  const [currentPage, setCurrentPage] = useState(0);

  const page = props.list.slice((appSettingsContext.itemsPerScreen * currentPage), (appSettingsContext.itemsPerScreen * (currentPage + 1)))

  const updateSortMethod = e => {
    e.preventDefault();
    appSettingsContext.setDefaultSort(e.target.value);
    //renderSortMethod();
  };

  const updateCompleted = e => {
    appSettingsContext.setCompleted(e.target.value);

    //TO DO: if props.list.complete is true, hide that item
  };

  const radioSubmit = e => {
    e.preventDefault();
    renderSortMethod();
  }

  const renderSortMethod = e => {
    if (appSettingsContext.defaultSortField === 'difficulty') {
      let result = props.list.sort((a, b) =>
        a.difficulty > b.difficulty ? 1 : -1
      );
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'assignee') {
      let result = props.list.sort((a, b) =>
        a.assignee > b.assignee ? 1 : -1
      );
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'status') {
      let result = props.list.sort((a, b) =>
        a.complete > b.complete ? 1 : -1
      );
      setList([result]);
    }
  };

  const nextPage = e => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = e => {
    setCurrentPage(currentPage - 1);
  }



  return (
    <div>
      {/* <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <buttonalue="false">
          </Form.Control>
        </Form.Group>
      </Form> */}
      {/* <DropdownButton onSubmit={radioSubmit} id="dropdown-item-button" title="Sort By">
        <Dropdown.Item onClick={updateSortMethod} as="button" value="difficulty" >Difficulty</Dropdown.Item>
        <Dropdown.Item onClick={updateSortMethod} as="button">Assignee</Dropdown.Item>
        <Dropdown.Item onClick={updateSortMethod} as="button">Status</Dropdown.Item>
      </DropdownButton> */}

      <p>Here is the show completed field {appSettingsContext.showCompleted}</p>
      <form onSubmit={radioSubmit} >

        <label for="sort">Choose a sort method:</label>

        {/* create a form, use radio buttons? set radio buttons to onChange, the form to onSubmit. onChange, we set the state before we submit */}
        <input type="radio" onClick={updateSortMethod} value="difficulty" />
          Difficulty

        <input type="radio" onClick={updateSortMethod} value="assignee" />
          Assignee

        <input type="radio" onClick={updateSortMethod} value="status" />
          Status
          <button type="submit">Sort</button>
      </form>
      <div>
        <button onClick={updateCompleted} value="false">
          Hide completed items
        </button>
      </div>

      {page.map(item => (
        <Modal.Dialog>
          <Modal.Header
            closeButton
            onClick={() => props.handleDelete(item._id)}
          >
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
              {item.text} difficulty: {item.difficulty}
            </span>
          </Modal.Body>
        </Modal.Dialog>
      ))}
      {currentPage > 0 ? <button onClick={previousPage}>Previous Page</button> : null}
      {props.list.length > (currentPage + 1) * 3 ? <button onClick={nextPage}>Next Page</button> : null}



    </div>
  );
}

export default TodoList;
