import JsonRPC from "./../../../common/jsonrpc.js"
import Config from "./../../../common/config.js"

var StartupImage = {
    GetScreenSizes:function(callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.GetScreenSizes",
            {},
            callbacks
        );
    },
    UpdateActive:function(startupImageId,isActive,callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.UpdateActive",
            {id:startupImageId,isActive:isActive},
            callbacks
        );
    },
    Update:function(startupImageId,name,startDate,endDate,displayTimes,imageSet,isActive,callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.Update",
            {id:startupImageId,name:name,startDate:startDate,endDate:endDate,displayTimes:displayTimes,imageSet:imageSet,isActive:isActive},
            callbacks
        );
    },
    AddStartupImage:function(name,startDate,endDate,displayTimes,imageSet,isActive,callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.AddStartupImage",
            {startDate:startDate,name:name,endDate:endDate,displayTimes:displayTimes,imageSet:imageSet,isActive:isActive},
            callbacks
        );
    },
    GetStartupImages:function(queryTime,activeMode,offset,limit,callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.GetStartupImages",
            {queryTime:queryTime,activeMode:activeMode,offset:offset,limit:limit},
            callbacks
        );
    },
    Delete:function(id,callbacks){
        JsonRPC.do(
            Config.API_URL,
            "StartupImage.Delete",
            {id:id},
            callbacks
        );
    }
}

module.exports = StartupImage