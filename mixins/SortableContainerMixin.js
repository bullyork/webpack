var update = require('react-addons-update');

var SortableContainerMixin = {
	collectionKey:"cards",
	getInitialState: function () {
	    return {
	          cards:[]
	    };
	},
	moveCardTimeout:-1,
	currentMoveId:"",
	_onMoveCardHandler:function(id,afterId){
		clearInterval(this.moveCardTimeout);
		this.moveCardTimeout = setTimeout(function(){
			this.moveCard(id,afterId);
		}.bind(this),20);
	},
	moveCard:function(id,afterId){
		if(this.currentMoveId === id+"|"+afterId){
			return;
		}else{
			this.currentMoveId = id+"|"+afterId;
		}
		var cards = this.state[this.collectionKey];

		var card = null;
		var cardIndex = -1;
		var afterCardIndex = -1;

		for(var i in cards){
			if(cards[i].id == id){
				card = cards[i];
				cardIndex = i;
			}
			if(cards[i].id == afterId){
				afterCardIndex = i;
			}
		}

		var coordinateData = {};
		coordinateData[this.collectionKey] = {
				$splice:[
					[cardIndex,1],
					[afterCardIndex,0,card]
				]
			};
		var newCards = update(this.state,coordinateData);
		this.setState(newCards)
	},
    dataToCard:function(data){
    	return {"id":data.id}
    },
    refreshCards:function(props){
    	if(props===undefined){
    		props = this.props;
    	}
    	var newCards = [];
    	var dataToCardFunc = props.dataToCard||this.dataToCard;
    	for(var i in props.data){
    		var item = props.data[i];
    		var tempData = dataToCardFunc(item);
    		if(props.customRender !== undefined){
    			if(typeof item === "object"){
	    			for(var k in item){
	    				tempData[k] = item[k];
	    			}
    			}
    		}
    		newCards.push(tempData);
    	}
    	var newData = {};
    	newData[this.collectionKey] = newCards;
    	this.setState(newData)
    },
    onDragEndHandler:function(id){
    	if(this.props.onDragEnd||this._onDragEndHandler){	
			var previd = "";
			var nextid = "";
			for(var i=0;i<this.state[this.collectionKey].length;i++){
				if(this.state[this.collectionKey][i].id === id){
					previd = this.getCardsId(i-1);
					nextid = this.getCardsId(i+1);
				}
			}
	    	this.props.onDragEnd&&this.props.onDragEnd(previd,nextid,id);
	    	this._onDragEndHandler&&this._onDragEndHandler(previd,nextid,id);
    	}
    },
	getCardsId:function(idx){
		if(this.state[this.collectionKey][idx]!==undefined){
			return this.state[this.collectionKey][idx].id;
		}
		return "";
	},
	getCurrentOrder:function(){
		var nowOrderIds = [];
		for(var i in this.state[this.collectionKey]){
			nowOrderIds.push(this.state[this.collectionKey][i]["id"]);
		}
		return nowOrderIds;
	},
	componentWillReceiveProps: function (nextProps) {
	 	this.refreshCards(nextProps);
	}
}
module.exports = SortableContainerMixin;