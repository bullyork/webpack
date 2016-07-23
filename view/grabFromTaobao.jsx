import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import store from '../store/grabFromTaobao'
import GrabFromTaobao from '../component/grabFromTaobao/grabFromTaobao'
import { Provider } from 'react-redux'
class GFT extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <GrabFromTaobao/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><GFT /></AppWrapper>, document.getElementById("appContainer"));