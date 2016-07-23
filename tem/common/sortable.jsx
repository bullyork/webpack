var SortableContainerMixin = require("../mixins/SortableContainerMixin.js");
import { DragSource, DropTarget,DragDropContext } from 'react-dnd';
import React from "react"
import HTML5Backend from 'react-dnd-html5-backend';

var ItemTypes={
    CARD:"card"
}

var dragSource = {
  beginDrag:function(props) {
    return {
      item: {
        cardid: props.cardid
      }
    };
  },
  canDrag:function(props){
    if(typeof props.canDarg === "undefined"){
        return true;
    }
    return props.canDarg;
  },
  endDrag:function(props){
    props.onDragEnd(props.cardid);
    return null;
  }
};

var dropTarget = {
  hover:function(props, monitor) {
    var item = monitor.getItem().item;
    props.moveCard&&props.moveCard(item.cardid, props.cardid);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectForTarget(connect){
    return {
        connectDropTarget: connect.dropTarget()
    }
}

var CardOrigin = React.createClass({
    propTypes: {},
    render: function() {
        const { isDragging, connectDragSource, connectDropTarget } = this.props;

        var opacity = isDragging.isDragging?0.5:1;

        if (this.props.customRender) {
            return this.props.customRender(this.props, connectDragSource, connectDropTarget, isDragging);
        } else {
            return connectDragSource(connectDropTarget( 
                <div 
                    style = {{opacity: opacity,cursor: "pointer"}}> 
                    <div>{this.props.text}</div>
                </div>
            ))
        }
    }
});

var Card = DropTarget(ItemTypes.CARD,dropTarget,collectForTarget)(DragSource(ItemTypes.CARD, dragSource, collect)(CardOrigin));

var Container = React.createClass({
	mixins:[SortableContainerMixin],
  render: function () {
  	var cards = this.state.cards.map(function(item){
		return (
			<Card key={item.id} 
				cardid={item.id} 
				{...item} 
				moveCard={this.moveCard}
				canDarg={this.props.canDarg}
				customRender={this.props.customRender}
				onDragEnd={this.onDragEndHandler}/>
		);
  	},this)
      return (
          <div>
          	{cards}
          </div>
      );
  }
});

export default DragDropContext(HTML5Backend)(Container);