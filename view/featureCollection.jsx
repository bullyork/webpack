var CollectionComponent = require("../component/featureCollection/collection.jsx");
import React,{Component} from "react";
import ReactDOM from "react-dom"
import { Router, Route, Link } from 'react-router';
import AppWrapper from "../common/appwrapperCommon.jsx";

class FeatureColl extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Router>
                    <Route path="/collection" component={CollectionComponent.Manage}></Route>
                    <Route path="/collectionEdit/:collectionId" component={CollectionComponent.CollectionEdit}></Route>
                    <Route path="/productManage/:collectionId" component={CollectionComponent.ProductManage}></Route>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<AppWrapper><FeatureColl /></AppWrapper>, document.getElementById("appContainer"));

