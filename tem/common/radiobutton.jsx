import React from "react"

var RadioButton = React.createClass({
	getInitialState: function () {
	    return {
	        value:null,  
	    	radioName:"radioName"+(new Date().getTime())+Math.random()*100,
	    };
	},
	render:function(){
		var radios = this.props.options.map(function(item){
			return (
				<label className="radio-inline">
					<input
						checked={item.value === this.state.value}
						type="radio" name={this.state.radioName}
						onChange={this._onRadioChangeHandler(item,this)} value={item.value} />
					{item.name}
				</label>
			);
		},this);
		return (
			<div>
				{radios}
			</div>
		)
	},
	componentDidMount: function () {
	    this.changeValue();    
	},
	componentWillReceiveProps: function (nextProps) {
	    this.changeValue(nextProps);  
	},
	changeValue:function(props){
		if(props === undefined){
			props = this.props;
		}
		if(this.state.value !== props.value){
			this.setState({value:props.value});
		}
	},
	_onRadioChangeHandler:function(item,context){
		return function(){
			context.setState({value:item.value});
			context.props.onChange&&context.props.onChange(item);
		}
	},
	getValue:function(){
		return this.state.value;
	}
});

export default RadioButton