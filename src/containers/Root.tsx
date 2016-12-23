import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";

const store = configureStore();

class Root extends React.Component<any, any> {
  public render(){
    return (
      <Provider>
        <AsyncApp/>
      </Provider>
    );
  }
}
