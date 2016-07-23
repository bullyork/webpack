export const OPEN_DIALOG = "OPEN_DIALOG"
export const CLOSE_DIALOG = "CLOSE_DIALOG"

export const openDialog = (dialogKey)=>{
	return {
		type:OPEN_DIALOG,
		dialogKey,
	}
}

export const closeDialog = (dialogKey)=>{
	return {
		type:CLOSE_DIALOG,
		dialogKey,
	}
}