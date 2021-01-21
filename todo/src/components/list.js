import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-js-pagination';
import { AppSettingsContext } from '../context/settings/context';
import useAjaxCalls from './hooks/ajax';

function TodoList(props) {
  const [URL, list, setList, addItem] = useAjaxCalls();
  const appSettingsContext = useContext(AppSettingsContext);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const updateSortMethod = e => {
    e.preventDefault();
    appSettingsContext.setDefaultSort(e.target.value);
    renderSortMethod();
  };

  const updateCompleted = e =>{
    appSettingsContext.setCompleted(e.target.value);
    //TO DO: if props.list.complete is true, hide that item
  }

  const renderSortMethod = e => {
    if (appSettingsContext.defaultSortField === 'difficulty') {
      let result = props.list.sort((a, b) =>
        a.difficulty > b.difficulty ? 1 : -1
      );
      console.log(result);
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'assignee') {
      let result = props.list.sort((a, b) =>
        a.assignee > b.assignee ? 1 : -1
      );
      console.log(result);
      setList([result]);
    } else if (appSettingsContext.defaultSortField === 'status') {
      let result = props.list.sort((a, b) =>
        a.complete > b.complete ? 1 : -1
      );
      console.log(result);
      setList([result]);
    }
  };

  console.log('this is props.list.length', props.list.length);
  return (
    <div>
      <p>
        Here is the show completed field {appSettingsContext.showCompleted}
      </p>
      <label for="sort">Choose a sort method:</label>
      <button onClick={updateSortMethod} value="difficulty">
        Difficulty
      </button>
      <button onClick={updateSortMethod} value="assignee">
        Assignee
      </button>
      <button onClick={updateSortMethod} value="status">
        Status
      </button>
      <div>
      <button onClick={updateCompleted} value="false">
        Hide completed items
      </button>
      </div>

      {props.list.map(item => (
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
      <Pagination
        activePage={activePage}
        itemsCountPerPage={3}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default TodoList;
