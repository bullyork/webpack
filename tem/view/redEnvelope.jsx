import React,{Component} from 'react';
import {Provider,connect} from "react-redux";
import ReactDOM from "react-dom"
import { createStore } from 'redux';
import { Router, Route, Link } from 'react-router';
import FeatureCollectionStore from "../component/RedEnvelope/userlist.jsx";
import AppWrapper from "../common/appwrapperCommon.jsx";
import {logout} from '../action/redEnvelopeAction';
import { bindActionCreators } from 'redux';
import rootReducer from '../reducer/redEnvelopeReducer';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            originCode:"CN",
        };
    }
    render() {
        return (
            <FeatureCollectionStore users={this.state.users} ></FeatureCollectionStore>
            )
        }
}

class RedEnvelopeRouter extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Router>
                    <Route path="/" component={App}>
                    </Route>
                </Router>
            </div>
        )
    }
}


const store = createStore(rootReducer)

class Redpacket extends Component {
  render() {
    return (
        <div>
            <Provider store={store}>
                <RedEnvelopeRouter />
            </Provider>
        </div>
    )
  }
}

ReactDOM.render(<AppWrapper><Redpacket /></AppWrapper>, document.getElementById("appContainer"));
