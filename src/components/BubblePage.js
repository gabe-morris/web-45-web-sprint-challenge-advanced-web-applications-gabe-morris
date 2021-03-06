import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from "axios";
import { useParams } from "react-router";
const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const {id} =  useParams()
  useEffect(()=>{
     axiosWithAuth()
        .get("http://localhost:5000/api/colors")
        .then(res => {
            setColors(res.data)
        })
        .catch(err => console.log({err}))
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${id}`, editColor)
    .then(res =>{
      console.log(res.data)
      setColors(res.data)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${id}`, colorToDelete)
    .then(res=> {
      console.log(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
