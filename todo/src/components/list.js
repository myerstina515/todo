import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-js-pagination';
import { AppSettingsContext } from '../context/settings/context';
import useAjaxCalls from './hooks/ajax';
import { SettingsContext } from '../context/settings/settings';

function TodoList(props) {
  const settings = useContext(SettingsContext);
  const [URL, list, setList, addItem] = useAjaxCalls();
  const [page, setPage] = useState(0);
  const appSettingsContext = useContext(AppSettingsContext);

  const list2 = props.list.filter(item =>
    settings.showCompleted ? true : !item.complete
  );
  const start = settings.maxVisible * page || 0;
  const end = start + settings.maxVisible || list.length;
  const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill(
    ''
  );

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

  return (
    <div>
      <p>Here is the show completed field {appSettingsContext.showCompleted}</p>
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
      <Pagination>
        {pages.map((n, i) => (
          <Pagination.Item key={i + 1} onClick={() => setPage(i)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default TodoList;
