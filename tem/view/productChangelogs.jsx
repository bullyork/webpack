import React,{Component} from 'react';
import ReactDOM from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Provider } from 'react-redux'
import store from '../store/productChangeLogs'
import ProductChangeLogs from '../component/logs/productChangeLogs'

class EzdeliveryArrange extends React.Component{
    render(){
        return (
            <Provider store={store}>
              <ProductChangeLogs/>
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper><EzdeliveryArrange /></AppWrapper>, document.getElementById("appContainer"));