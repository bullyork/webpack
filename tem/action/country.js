export const CHANGE_COUNTRY = "CHANGE_COUNTRY"

export const changeCountry = (countryCode)=>{
	return {type:CHANGE_COUNTRY,countryCode}
}