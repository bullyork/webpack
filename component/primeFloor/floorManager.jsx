import React, { PropTypes,Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PrimeFloorService from "./../../models/PrimeFloorService.js";
import PrimeFloorStore from "./../../store/primeFloor.js";
import {getFloor,getCategory,setCategory,deleteCation} from "./../../action/primeFloorAction.js";

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}; 


class FloorCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    onselectCategory(id){
        return function(){
            console.info(id);
            PrimeFloorStore.dispatch(setCategory(id));
        }
    }
    addDialog(event){
        var id = parseInt(event.target.name);
        this.props.addProductFun(id)
    }
    deleteFloor(id){
        var self = this;
        return function(){
            PrimeFloorStore.dispatch(deleteCation(id));
        }
    }
    render(){
        var floorBackground = "white";
        if(this.props.SelectCategory === this.props.id){
            floorBackground = "#999";
        }else {
            floorBackground = "white";
        }
        if(this.props.SelectCategory === 0){
            if(this.props.productCateogry === this.props.id){
                floorBackground = "#999";
            }
        }
        const { text, connectDragSource, connectDropTarget,isDragging} = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
            <div style={{height:"45px",width:"100%",backgroundColor:"white",textAlign:"center",lineHeight:"45px",backgroundColor:floorBackground}} name={this.props.id}>
                <div style={{width:"70%",float:"left",height:"100%"}} onClick={this.onselectCategory(this.props.id)}>{this.props.id}</div>
                <div style={{float:"left",marginLeft:"5px",width:"12%"}} onClick={this.deleteFloor(this.props.id)}>Delete</div>
            </div>
            ));
    }
}

const type='item';

const itemSource = {
  beginDrag(props) {
    return { id: props.id };
  },
  endDrag(props){
    PrimeFloorService.SortCategoryFloor(props.preItemId,props.afterId,props.id).then(function(data){
        PrimeFloorStore.dispatch(getFloor());
        self.setState({})
    })
    return null;
  }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const itemTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveItem(draggedId, props.id);
    }
  }
};

function collectTaget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}
module.exports = DragSource(type, itemSource, collectSource)(DropTarget(type,itemTarget,collectTaget)(FloorCategory));
