import React from 'react';
import {useState} from 'react';

const Edit = (props) =>{
    const [change,setChange] = useState("");
    const changeHandler = (e) =>{
        setChange(e.target.value);
    }
    const editHandler = () =>{
        const arr = props.arr;
        
        props.setArr(arr.map((value)=>{
            return {...value,taskName:change}
        }))
    }
    return (
        <div style={{display:"flex",justifyContent:"space-between,"}}>
            <input style={{height:40,marginRight:20}} type="text" placeholder="update your task" onChange={changeHandler}/>
            <button style={{height:40,borderRadius:20,borderStyle:"solid",backgroundColor:"blue",}} onClick={editHandler}>Update</button>
        </div>
    );
}
export default Edit;