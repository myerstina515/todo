import axios from 'axios';
import React, { useState, useEffect } from 'react';


function useAjaxCalls() {
  const URL = 'https://api-js401.herokuapp.com/api/v1/todo';
  const [list, setList] = useState([]);
  
  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
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
  };
  return [URL, list, setList, addItem]
}

export default useAjaxCalls;