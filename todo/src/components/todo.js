import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './todo.scss';
const URL = 'https://api-js401.herokuapp.com/api/v1/todo';

function ToDo(props) {
  const [list, setList] = useState([]);

  const [count, setCount] = useState();

  useEffect(() => {
    setCount(list.filter(item => !item.complete).length)
  }, [list]);

  useEffect(() => {
    reload();
  }, []);

  const reload = async() => {
    console.log('inside reload function');
    await axios.get(URL)
      .then(results => {
        console.log('results two ways', results.data)
        setList(results.data.results);
      }) 
      .catch((err) => {
        console.error(err)
      });
  }

  const addItem = (item) => {
    console.log('this is the item', item);
        axios.post(URL,
      {
        "complete": false,
        "difficulty": item.difficulty,
        "text": item.text,
        "assignee": item.assignee,
        "__v": 0
    },
    )
      .then(results => {
        console.log('inside the .then', results);
        setList([...list, results.data]);
        console.log('after set list', list);
      })
      .catch((err)=>{
        console.error(err)
      })
    // item._id = Math.random();
    // item.complete = false;
  };

  const toggleComplete = async(id) => {
    console.log(id);
    let item = list.filter(i => i._id === id)[0] || {};
    console.log(item._id)
    if(item._id){
      console.log('is the item complete', item.complete);
      // let complete = item.complete ? !item.complete : item.complete;
      const res = await axios.put(`${URL}/${id}`, {"complete": !item.complete})
      // .then(() => {
      // reload();
      // })
      console.log('this is the list before new list', list);
      let removeId = item._id;
      let newList = list.filter((item) => item._id !== removeId)
      console.log(newList);
      setList([...newList, res.data]);
    }
    // console.log(list);

    

  };

  return (
    <div>
      
      <Container fluid id="container">
        <Row>
          <Col>There are {count} Items To Complete</Col>
        </Row>
      </Container>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
          />
        </div>
      </section>
    </div>
  );
}


export default ToDo;