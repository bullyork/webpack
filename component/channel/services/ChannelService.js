import WebApi from "./../../../common/toastwebapi.js"
import Config from "./../../../common/config.js"

var ChannelService = {
    Search:function(parentChannelId,countryCode) {
    	return WebApi.do(
    		"Channel.Search", 
    		{parentChannelId,countryCode},
    		Config.API_CHANNEL
    	);
    },
    GetByChannelId:function(channelId){
        return WebApi.do(
            "Channel.GetByChannelId",
            {channelId},
            Config.API_CHANNEL
        )
    },
    Add:function(channel){
    	return WebApi.do(
    		"Channel.Add",
    		{channel},
    		Config.API_CHANNEL
    	)
    },
    Update:function(channel){
        return WebApi.do(
            "Channel.Update",
            {channel},
            Config.API_CHANNEL
        );
    },
    ChannelSort(parentId,countryCode,prevId,nextId,sortId){
        return WebApi.do(
            "Channel.ChannelSort",
            {parentId,countryCode,prevId,nextId,sortId},
            Config.API_CHANNEL
        );
    },
    GetShowPageCollections(countryCode){
        return WebApi.do(
            "Channel.GetShowPageCollections",
            {countryCode},
            Config.API_CHANNEL
        );
    },
    EditHomeCollections(countryCode,primeTrendings,unPrimeTrendings){
        return WebApi.do(
            "Channel.EditHomeCollections",
            {countryCode,primeTrendings,unPrimeTrendings},
            Config.API_CHANNEL
        );
    }
}

export default ChannelService
