import React from "react"
import ReactDOM from "react-dom"

var Waterfall = React.createClass({
    scrollTop:0,
    imageLoad:0,
    loadMoreTimeout:-1,
    getInitialState: function () {
        return {
            columnWidth:"20%",
        };
    },
    getDefaultProps: function () {
        return {
            columnNum:5
        };
    },
    displayName: 'Waterfall',
    render: function () {
        return (
            <div ref="waterfallContainer" className="waterfallContainer">
                {this.getColumns()}
            </div>
        );
    },
    getColumns:function(){
        var columns = [];
        var columnsWithWrapper = [];
        var rowCount = Math.ceil(this.props.data.length/this.props.columnNum);
        
        for(var j=0;j< rowCount;j++){
            for(var i=0;i < this.props.columnNum;i++){
                var idx = j*this.props.columnNum+i;
                if(this.props.data[idx]===undefined){
                    break;
                }else{
                    var itemData = this.props.data[idx];
                    if(columns[i]===undefined){
                        columns[i] = new Array();
                    }
                    columns[i].push(this.props.itemRender(itemData,i));
                }
            }
        }
        for(var i=0;i< columns.length;i++){
            if(columnsWithWrapper[i]===undefined){
                columnsWithWrapper[i] = new Array();
            }
            columnsWithWrapper[i].push(
                <div className="column" ref={"column_"+i} key={i} style={{width:this.state.columnWidth}}>{columns[i]}</div>
            )
        }
        return columnsWithWrapper;
    },
    initScrollEvent:function(){
        window.onscroll = function(){
            var column = ReactDOM.findDOMNode(this.refs["column_1"]);
            if(column!==null){
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var pageHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
                var columnAllHeight = column.offsetHeight+column.offsetTop;

                //column all height > page and scroll height util need load.
                if((columnAllHeight - (pageHeight+scrollTop) < 100) && (scrollTop > this.scrollTop)){
                    this.scrollTop = scrollTop;
                    clearTimeout(this.loadMoreTimeout);
                    this.loadMoreTimeout = setTimeout(function(){
                        this.props.onLoadMore&&this.props.onLoadMore();
                    }.bind(this),500)
                }
            }
            this.loadImages();
        }.bind(this)
    },
    componentDidMount: function () {
        this.initScrollEvent();
        setTimeout(function(){
            this.loadImages();
        }.bind(this),1000);   
    },
    loadImages:function(){
        var imgs = [];
        var columns = [];
        for(var i=0;i< this.props.columnNum;i++){
            var column = ReactDOM.findDOMNode(this.refs["column_"+i]);
            if(column!==null){
                columns.push(column);
                var item = column.querySelector("img[src='']");
                if(item!==null){
                    imgs.push(item);
                }
            }
        }
        
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var showImages = [];
        var outerHeight = scrollTop + (window.innerHeight || document.documentElement.clientHeight);

        for(var i=0;i< imgs.length;i++ ){
            var item = imgs[i];
            var columnIdx = item.getAttribute("data-columnidx");
            var column = columns[columnIdx];
            if(column.offsetTop+item.offsetTop < outerHeight){
                this.setImage(item);
                this.imageLoad++;
            }
        }
    },
    onImageLoadCompeleteHandler:function(){
        if(this.imageLoad === 0){
            this.loadImages();
        }
    },
    setImage:function(item){
        item.setAttribute("src",item.getAttribute("data-src"));
        item.setAttribute("data-src","");    
        
        item.onload = function(item){
            this.imageLoad--;
            this.onImageLoadCompeleteHandler();
        }.bind(this);
        item.onerror = function(){
            this.imageLoad--;
            this.onImageLoadCompeleteHandler();
        }.bind(this);
    }
});

export default Waterfall;