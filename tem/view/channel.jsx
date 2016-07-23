import React,{Component} from "react"
import {render} from "react-dom"
import AppWrapper from "../common/appwrapperCommon.jsx"
import { Router, Route, Link, hashHistory } from 'react-router'
import {ChannelList,ChannelEditBasic,ChannelAdd,ChannelKeywordsEdit,ChannelCampaignsEdit} from "../component/channel"
import {Provider} from "react-redux"
import store from '../component/channel/stores/channel.js'
import { syncHistoryWithStore } from 'react-router-redux'


const history = syncHistoryWithStore(hashHistory, store)

class Channel extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route path="/(:parentChannelId)" component={ChannelList}></Route>
					<Route path="/editBasic/:channelId" component={ChannelEditBasic}></Route>
					<Route path="/editKeywords/:channelId" component={ChannelKeywordsEdit}></Route>
					<Route path="/editCampaigns/:channelId" component={ChannelCampaignsEdit}></Route>
					<Route path="/add/:channelId" component={ChannelAdd}></Route>
				</Router>
			</Provider>
		)
	}
}


render(<AppWrapper><Channel /></AppWrapper>, document.getElementById("appContainer"))