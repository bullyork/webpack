
export const LOGOUT = "LOGOUT";
export const SET_LIST = "SET_LIST";
export const SET_COUNTRY = "SET_COUNTRY"

export function logout(text){
	return {
		type:LOGOUT,
		text:text,
	}
}

export function setListUser(text){
	return {
		type:SET_LIST,
		text:text,
	}
}

export function setOriginCode (text) {
	console.info(text);
	return {
		type:SET_COUNTRY,
		text:text,
	}
}

