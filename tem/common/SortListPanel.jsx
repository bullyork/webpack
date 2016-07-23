import React,{Component,PropTypes} from "react";
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget,DragDropContext } from 'react-dnd';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';

const ItemTypes = {
	CARD: 'card'
}

@DragDropContext(HTML5Backend)
export default class SortListPanel extends Component{
  constructor(props){
    super(props);
    ["moveCard","dropCard"].forEach((methodName)=>{
      this[methodName] = this[methodName].bind(this)
    });
    this.state = {
      cards:[]
    }
  }

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
	}

  dropCard(dropIndex){
    let prevKey = "";
    let nextKey = "";
    let currentKey = this.state.cards[dropIndex].key;

    if(dropIndex !== 0){
      prevKey = this.state.cards[dropIndex-1].key;
    }

    if(dropIndex !== this.state.cards.length - 1){
      nextKey = this.state.cards[dropIndex+1].key;
    }

    if(typeof this.props.onOrderChange !== "undefined"){
      this.props.onOrderChange(prevKey,currentKey,nextKey);
    }
  }

	render() {
		const { cards } = this.state;

		return (
			<div>
				{
					cards.map((item, i) => {
						return (
							<Card 
								key={item.key}
								index={i}
								id={item.key}
								text={item.text}
								moveCard={this.moveCard} 
                canDrag={this.props.canDrag}
                dropCard={this.dropCard}
								/>
						);
					})
				}
			</div>
		);
	}

  componentDidMount(){
    this.setState({cards:this.props.data});
  }

  componentWillReceiveProps(nextProps){
    if(this.props.data !== nextProps.data){
      this.setState({cards:nextProps.data});
    }
  }
}



const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  canDrag(props, monitor){
    return props.canDrag;
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },

  drop(props, monitor, component){
    props.dropCard(props.index);
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    dropCard:PropTypes.func.isRequired,
    canDrag:PropTypes.bool,
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
      </div>
    ));
  }
}
