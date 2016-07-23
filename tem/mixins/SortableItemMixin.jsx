var ReactDND = require("react-dnd");

var SortableItemMixinGenerator = function(dropTargetName,dragSourceName){
	var dragId = "";
	var dragSource = {
		beginDrag:function(component) {
			dragId = component.props.cardid;
			return {
				item: {
					cardid: component.props.cardid
				}
			};
		},
		canDrag:function(component){
			if(component.props.canDarg===undefined){
				return true;
			}
			return component.props.canDarg;
		},
		endDrag:function(component){
			component.props.onDragEnd(dragId);
			return null;
		}
	};

	var dropTarget = {
		over:function(component, item) {
			component.props.moveCard&&component.props.moveCard(item.cardid, component.props.cardid);
		}
	};

	return {
		mixins:[ReactDND.DragDropMixin],
		statics:{
			configureDragDrop:function(register){
				register(dragSourceName,{
					dragSource:dragSource,
					dropTarget:dropTarget
				})
			}
		},
		getCurrentDragState:function(){
			return this.getDragState(dragSourceName);
		},
		getDragItemProps:function(){
			let obj1 = this.dragSourceFor(dragSourceName);
			let obj2 = this.dropTargetFor(dropTargetName);
			return _.merge(obj1,obj2);
		}
	}
}

module.exports = SortableItemMixinGenerator;
