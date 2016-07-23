import {GET_MANAGEER,GET_ROLES} from "../action/admin.js";
import { combineReducers } from 'redux'

const initialState = {
    managerUsers:[],
    systems:[],
}

function Tusers(state=initialState,action){
    switch(action.type){
        case GET_MANAGEER:
            if(action.userList === undefined){
                action.userList = [];
            }
            return Object.assign({},state, {
                managerUsers:action.userList,
            })
        case GET_ROLES:
            return Object.assign({},state, {
                roles:action.roles
            })
        default:
            return state;
        }
}


var rootReducer = combineReducers({
    Tusers
});

export default rootReducer