import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
// import Pagination from 'react-js-pagination';
import { AppSettingsContext } from '../context/settings/context';
import useAjaxCalls from './hooks/ajax';
import { SettingsContext } from '../context/settings/settings';


function TodoList(props) {
  const settings = useContext(SettingsContext);
  const [URL, list, setList, addItem] = useAjaxCalls();
  // const [page, setPage] = useState(0);
  const appSettingsContext = useContext(AppSettingsContext);

  // const list2 = props.list.filter(item =>
  //   settings.showCompleted ? true : !item.complete
  // );
  const [currentPage, setCurrentPage] = useState(0);
  // const [resultsPerPage, setResultsPerPage] = useState(3);
  // const start = settings.maxVisible * page || 0;
  // const end = start + settings.maxVisible || list.length;
  // const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill(
    // ''
  // );

  const page = props.list.slice((settings.maxVisible * currentPage), (settings.maxVisible * (currentPage + 1)))
// Page 1= Lower limit (settings.maxVisible * (currentPage) = 0)
// Page 2 = (settings.maxVisible * (currentPage) = 3)

  const updateSortMethod = e => {
    e.preventDefault();
    appSettingsContext.setDefaultSort(e.target.value);
    renderSortMethod();
  };

  const updateCompleted = e => {
    appSettingsContext.setCompleted(e.target.value);
    //TO DO: if props.list.complete is true, hide that item
  };

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
    setCurrentPage(currentPage -1);
  }

  return (
    <div>
      <p>Here is the show completed field {appSettingsContext.showCompleted}</p>
      <label for="sort">Choose a sort method:</label>
      {/* create a form, use radio buttons? set radio buttons to onChange, the form to onSubmit. onChange, we set the state before we submit */}
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
      <button onClick={nextPage}>Next Page</button>
      <button onClick={previousPage}>Previous Page</button>
    </div>
  );
}

export default TodoList;
