import ChannelService from "./../services/ChannelService.js"

export const LOAD_LIST = "LOAD_LIST";

export const ADD = "ADD";

export const SAVE = "SAVE";

export const SAVE_DISPLAYFRONT = "SAVE_DISPLAYFRONT";

export const LOAD_DETAIL = "LOAD_DETAIL";

export const START_EDIT_KEYWORD = "START_EDIT_KEYWORD";
export const END_EDIT_KEYWORD = "END_EDIT_KEYWORD";

export const START_EDIT_CAMPAIGN = "START_EDIT_CAMPAIGN";
export const END_EDIT_CAMPAIGN = "END_EDIT_CAMPAIGN";
export const CHANGE_SORT = "CHANGE_SORT";

export const STATUS_LOADING = 0;
export const STATUS_LOADING_SUCCESS = 1;
export const STATUS_LOADING_FAILURE = -1;

const {assign} = Object;

export const loadList = (parentChannelId,countryCode)=>{
	return (dispatch,getState)=>{
		dispatch({type:LOAD_LIST,status:STATUS_LOADING});
		return ChannelService.Search(parentChannelId,countryCode).then((channels)=>{
			dispatch({type:LOAD_LIST,channels,status:STATUS_LOADING_SUCCESS})
		})
	}
}


export const loadDetail = (channelId)=>{
	return (dispatch,getState)=>{
		dispatch({type:LOAD_DETAIL,status:STATUS_LOADING});

		return ChannelService.GetByChannelId(channelId).then((channel)=>{
			dispatch({type:LOAD_DETAIL,channel,status:STATUS_LOADING_SUCCESS})
		})
	}
}

export const doAdd = (channel)=>{
	return (dispatch,getState)=>{
		dispatch({type:ADD,status:STATUS_LOADING});
		return ChannelService.Add(channel).then((id)=>{
			dispatch({type:ADD,channel:assign({},channel,{id}),status:STATUS_LOADING_SUCCESS});
			if(id !== 0){
				return true;
			}
			return false;
		})
	}
}

export const doSave = (channel)=>{
	return (dispatch,getState)=>{
		dispatch({type:SAVE});
		return ChannelService.Update(channel).then((flag)=>{
			dispatch({type:SAVE,channel,status:STATUS_LOADING_SUCCESS});
			return flag;
		})
	}
}

export const startEditKeyword = (index)=>{
	return {type:START_EDIT_KEYWORD,index};
}

export const doSaveKeyword = (keyword)=>{
	return (dispatch,getState)=>{
		let {editingChannel,editingKeywordIndex} = getState();
		return dispatch(doSave(assign({},editingChannel,{
			keywords:[...editingChannel.keywords.slice(0,editingKeywordIndex),keyword,...editingChannel.keywords.slice(editingKeywordIndex+1)]
		})));
	}
}

export const doDeleteKeyword = (idx)=>{
	return (dispatch,getState)=>{
		let {editingChannel,editingKeywordIndex} = getState();
		
		return dispatch(doSave(assign({},editingChannel,{
			keywords:[...editingChannel.keywords.slice(0,idx),...editingChannel.keywords.slice(idx+1)]
		})));
	}
}

export const doAddKeyword = (keyword)=>{
	return (dispatch,getState)=>{
		let {editingChannel} = getState();
		
		return dispatch(doSave(assign({},editingChannel,{
			keywords:[keyword,...editingChannel.keywords]
		})));
	}
}

export const endEditKeyword = ()=>{
	return {type:END_EDIT_KEYWORD};
}


export const startEditCampaign = (index)=>{
	return {type:START_EDIT_CAMPAIGN,index};
}

export const doSaveCampaign = (campaign)=>{
	return (dispatch,getState)=>{
		let {editingChannel,editingCampaignIndex} = getState();
		return dispatch(doSave(assign({},editingChannel,{
			campaigns:[...editingChannel.campaigns.slice(0,editingCampaignIndex),campaign,...editingChannel.campaigns.slice(editingCampaignIndex+1)]
		})));
	}
}


export const doAddCampaign = (campaign)=>{
	return (dispatch,getState)=>{
		let {editingChannel} = getState();
		
		return dispatch(doSave(assign({},editingChannel,{
			campaigns:[...editingChannel.campaigns,campaign]
		})));
	}
}

export const endEditCampaign = ()=>{
	return {type:END_EDIT_CAMPAIGN};
}


export const doSaveIsDisplayFront = (channelId,newValue)=>{
	return (dispatch,getState)=>{
		let {channels} = getState();
		let channel = channels.find(channel=>channel.id === channelId);

		return dispatch(doSave(assign({},channel,{
			isDisplayFront:newValue	
		})))
	}
}

export const changeSort = (prevKey,currentKey,nextKey,parentId)=>{
	return (dispatch,getState)=>{
		dispatch({type:CHANGE_SORT,status:STATUS_LOADING});

		let {country} = getState();

		return ChannelService.ChannelSort(parentId,country,prevKey,nextKey,currentKey).then((flag)=>{
			dispatch({type:CHANGE_SORT,status:STATUS_LOADING_SUCCESS,flag,prevKey,currentKey,nextKey});
			return flag;
		},()=>{
			dispatch({type:CHANGE_SORT,status:STATUS_LOADING_FAILURE});
			return false;
		})
	}
}
