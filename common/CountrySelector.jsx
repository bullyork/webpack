import {Select} from "antd"
import React,{Component} from "react"

const Option = Select.Option;


class CountrySelector extends Component{
	render(){
		return (
				<Select value={this.props.value} style={{ width: 120 }} onChange={(countryCode)=>{this.props.onChange(countryCode)}}>
					<Option value="SG">Singapore</Option>
					<Option value="MY">Malaysia</Option>
          			<Option value="AU">Australia</Option>
          			<Option value="ID">Indonesia</Option>
          			<Option value="TH">Thailand</Option>
				</Select>
		)
	}
}

export default CountrySelector