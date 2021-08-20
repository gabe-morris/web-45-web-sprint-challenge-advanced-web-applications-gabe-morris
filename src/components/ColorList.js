import axios from "axios";
import React, { useState,useEffect } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth'
import Color from './Color';
import EditMenu from './EditMenu';

const ColorList = (props) => {
  const {editing, toggleEdit, saveEdit, deleteColor } = props;
  const [colors, setColor] = useState([])
  const [ editColor, setEditColor] = useState({ color: "", code: { hex: "" }});
  
  useEffect(()=> {
    axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => {
      setColor(res.data)
      console.log(res.data)
    })
    .catch(err => console.log({err}))
  },[])
  return (
    <div className="colors-wrap">
      <p id="color_title">colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} setEditColor={setEditColor} color={color} toggleEdit={toggleEdit} deleteColor={deleteColor}/>)}
      </ul>
      
      {editing && <EditMenu editColor={editColor} setEditColor={setEditColor} toggleEdit={toggleEdit} saveEdit={saveEdit}/>}
    </div>
  );
};

export default ColorList;