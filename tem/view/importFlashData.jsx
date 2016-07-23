import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx";
import ImportFlashData from '../component/importFlashData/importFlashData'



ReactDOM.render(<AppWrapper><ImportFlashData /></AppWrapper>, document.getElementById("appContainer"));