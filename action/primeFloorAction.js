import { Modal,Button ,Menu, DropdownButton, message,Upload,Icon, Dropdown } from 'antd';

var Cateogry = [{id:"25300",name:"shoes"},{id:"25311",name:"shangyi"},{id:"25322",name:"maoyi"}]

import PrimeFloorService from "./../models/PrimeFloorService.js"

export const GET_FLOOR = "GET_FLOOR";
export const GET_CATEGORY = "GET_CATEGORY";
export const SET_CATEGORY = "SET_CATEGORY";

export var getCategory = function(){
    return (dispatch)=>{
        PrimeFloorService.GetCategoryList().then((categoryList)=>{
            console.info(categoryList);
            dispatch(getCategoryAction(categoryList));
        })
    }
}

var getCategoryAction = function(Cateogry){
    return {type:GET_CATEGORY,Cateogry}
}

export var setCategory = function(CateogryId){
	return {type:SET_CATEGORY,CateogryId}
}

export var getFloor = function(){
    return (dispatch)=>{
        PrimeFloorService.primeList().then((PrimeFloor)=>{
            dispatch(getFloorAction(PrimeFloor));
        })
    }
}

var getFloorAction = function(floorList){
    return {type:GET_FLOOR,floorList}
}

export var deleteCation =function(id){
    return (dispatch)=>{
        if(confirm("Delete this Floor?")){
            PrimeFloorService.RemoveCategoryFloor(id).then(function(data){
                if(data === true){
                    message.success('Delete success',3)
                    dispatch(getFloor());
                }else {
                   alert("fail"); 
                }
            })
        }
    }
}

