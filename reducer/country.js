import {CHANGE_COUNTRY} from "./../action/country.js"

const country = (state="SG",action)=>{
	switch(action.type){
		case CHANGE_COUNTRY:
			return action.countryCode;
		default:
			return state;
	}
}

const countryReducer = {
	country
}

export default countryReducer