import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [str, setStr] = useState('');
  const [arr, setArr] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const changeHandler = (e) => {
    setStr(e.target.value);
    console.log(e.target.value);
  };

  const taskHandler = () => {
    const object = {
      id: arr.length === 0 ? 1 : arr[arr.length - 1].id + 1,
      taskName: str,
      completedTime: new Date(`${date}T${time}`).getTime(),
    };
    setArr([...arr, object]);
  };

  const deleteHandler = (id) => {
    setArr(arr.filter((value) => value.id !== id));
  };

  const editHandler = (id) => {
    setEditId(id);
    const task = arr.find((value) => value.id === id);
    setEditText(task.taskName);
  };

  const saveHandler = () => {
    const updatedArr = arr.map((value) => {
      if (value.id === editId) {
        return { ...value, taskName: editText };
      } else {
        return { ...value };
      }
    });

    setArr(updatedArr);
    setEditId(null);
    setEditText('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const updatedArr = arr.map((value) => {
        if (value.completedTime <= currentTime) {
          return { ...value, item: true };
        } else {
          return { ...value };
        }
      });

      setArr(updatedArr);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [arr]);

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(undefined, options);
  };

  const formatTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return dateObj.toLocaleTimeString(undefined, options);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'orange',height:2000}}>
      <div className="main">
        <div className="firstDiv">
          <h1>Plan Of Work</h1>
        </div>
        <div className="secondDiv">
          <input className="textInput" type="text" onChange={changeHandler} />
          <div>
            <input type="date" onChange={(e) => { setDate(e.target.value); }} />
            <input type="time" onChange={(e) => { setTime(e.target.value); }} />
          </div>
          <button onClick={taskHandler}>addTask</button>
        </div>
        <div>
          {arr.map((value) => {
            return (
              <div key={value.id}>
                <div className={`add ${value.item ? 'completed' : ''}`} style={{ backgroundColor: value.item === true ? 'green' : 'blue' }}>
                  {editId === value.id ? (
                    <>
                      <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <button onClick={saveHandler}>Save</button>
                    </>
                  ) : (
                    <>
                      <h1>{value.taskName}</h1>
                      <div>{formatDate(value.completedTime)}</div>
                      <div>{formatTime(value.completedTime)}</div>
                      {!value.item && <button onClick={() => editHandler(value.id)}>Edit</button>}
                    </>
                  )}
                  {value.item ? null : <button onClick={() => deleteHandler(value.id)}>delete</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
