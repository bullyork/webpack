export function splitArray (datas,number){
	var resultArray = [];
	for(var i=0;i<Math.ceil(datas.length/number);i++){
		var tempData = datas.slice(i*number,(i+1)*number);
		if(tempData.length === 0){
			break;
		}else{
			resultArray.push(tempData);
		}
	}
	return resultArray;
}

export function splitVerticalArray (dataArray,number){
	var resultArray = [];
	dataArray.forEach((dataItem,idx)=>{
		let arrNumber = idx % number;
		if(typeof resultArray[arrNumber] === "undefined"){
			resultArray[arrNumber] = [];
		}
		resultArray[arrNumber].push(dataItem);
	});
	return resultArray;
}