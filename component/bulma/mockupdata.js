
var convertToTimeString = function(time){
	var date = new Date();
	date.setTime(time);
	return `${date.getFullYear()}-${auto2TwoBit(date.getMonth()+1)}-${auto2TwoBit(date.getDate())} ${auto2TwoBit(date.getHours())}:${auto2TwoBit(date.getMinutes())}:${auto2TwoBit(date.getSeconds())}`;
}

var auto2TwoBit = function(num){
	return num < 10 ? `0${num}`:`${num}`;
}

var data = [
	{
		type:"Banner",
		content:{
			picture:"http://placehold.it/2000x320",
			linkAddress:""
		}
	},{
		type:"LoginDialog",
		content:{
			picture:"http://placehold.it/2000x320",
			linkAddress:""
		}
	},
	{
		type:"Introduce",
		content:{
			quickGuild:[
			{
				question:"What is ezbuy Prime?",
				answers:[{title:"dsodhosdhos"},{title:"dsodhosdahowehowdhos"}]
			},
			{
				question:"What is ezbuy Prime2?",
				answers:[{title:"dsodhosdhos"},{title:"dsodhosdahowehowdhos"}]
			}
			]
		}
	},
	{
		type:"BannerFourPerGroup",
		content:{
			banners:[{
				name1:"",
				name2:"",
				picture:"",
				linkAddress:""
			},{
				name1:"",
				name2:"",
				picture:"",
				linkAddress:""
			},{
				name1:"",
				name2:"",
				picture:"",
				linkAddress:""
			},{
				name1:"",
				name2:"",
				picture:"",
				linkAddress:""
			}
			]
		}
	},
	{
		type:"CountDownClock",
		content:{
			startTime:convertToTimeString(new Date()),
			endTime:convertToTimeString(new Date().getTime() + 3600 * 1000),
			products:[
				{
					name:"This is a test product name 1",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/390x390",
					stock:14
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/390x390",
					stock:14
				},
				{
					name:"This is a test product name 3",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/390x390",
					stock:0
				}
			]
		}
	},
	{
		type:"TagsOnProducts",
		content: {
			data:[
				{
					tag:"Fashion",
					products:[]
				},
				{
					tag:"Baby",
					products:[]
				},
				{
					tag:"Tops",
					products:[]
				},
				{
					tag:"Women Underware",
					products:[]
				},
				{
					tag:"Women Shoes",
					products:[]
				},
				{
					tag:"Dress",
					products:[]
				},
				{
					tag:"Pants",
					products:[]
				},
				{
					tag:"Skirts",
					products:[]
				},
			]
		}
	},
	{
		type:"BannerProduct",
		content:{
			data:[
				{
					banner:{
						picture:"http://placehold.it/345x356",
						linkAddress:"https://ezbuy.sg/",	
					},
					products:[

					]
				}
			]
		}
	},
	{
		type:"ProductsFourPerGroup",
		content:{
			products:[
				
			]
		}
	},
	{
		type:"BannerWithFourProducts",
		content:{
			data:[
				{
					banner:{
						"picture": "http://placehold.it/564x703",
						"linkAddress": "https://ezbuy.sg/"
				    },
				    products:[]
				}
			]
		}
	},
	{
		type:"TagBannerWithEightProducts",
		content:{
			data:[
				{
					tag:"Fashion",
					data:[
						{
							banner: {
					            picture: "http://placehold.it/340x541",
					            linkAddress: "http://www.65daigou.com/"
					        },
						    products:[]
					    }
					]
				},	
				{
					tag:"Baby",
					data:[
						{
							banner: {
					            picture: "http://placehold.it/340x541",
					            linkAddress: "http://www.65daigou.com/"
					        },
					        products:[]
						}
					]
				},
			]
		}
	},
  {
    "type": "Register",
    "content": {"bgImage":"http://placehold.it/2000x320","linkAddress":"/"}
  }
];

var dataMobile = [
	{
		type:"HeaderMobile",
		content:{
			linkAddress:""
		}
	},
	{
		type:"FooterMobile",
		content:{
			linkAddress:""
		}
	},
	{
		type:"SmallBannerMobile",
		content:{
			linkAddress:["","",""]
		}
	},
	{
		type:"QuickGuildMobile",
		content:{
			quickGuild:[
			{
				"question":"what is ezbuy",
				"answers":[
				{
					"title":"is ok",
					"answer":"oh the isd"
				},
				{
					"title":"is false",
					"answer":"is ohsohos"
				},{
					"title":"ueiwu",
					"answer":"hdshds"
				}
				]
			}
			]
		}
	},
	{
		type:"ProductsFourPerGroupMobile",
		content:{
			products:[
			{
				name1:"solid",
				name2:"kuil",
				picture:"https://placeholdit.imgix.net/~text?txtsize=26&bg=%2522%2C&txtclr=%2522linkaddress&txt=280%C3%97280&w=280&h=280",
				linkAddress:""
			},
			{
				name1:"solid",
				name2:"kuil",
				picture:"https://placeholdit.imgix.net/~text?txtsize=26&bg=%2522%2C&txtclr=%2522linkaddress&txt=280%C3%97280&w=280&h=280",
				linkAddress:""
			},
			{
				name1:"solid",
				name2:"kuil",
				picture:"https://placeholdit.imgix.net/~text?txtsize=26&bg=%2522%2C&txtclr=%2522linkaddress&txt=280%C3%97280&w=280&h=280",
				linkAddress:""
			},
			{
				name1:"solid",
				name2:"kuil",
				picture:"https://placeholdit.imgix.net/~text?txtsize=26&bg=%2522%2C&txtclr=%2522linkaddress&txt=280%C3%97280&w=280&h=280",
				linkAddress:""
			}
			]
		}
	},
	{
		type:"BannerMobile",
		content:{
			picture:"http://placehold.it/375x90",
			linkAddress:""
		}
	},
	{
		type:"RegisterMobile",
		content:{
			bgImage:"http://placehold.it/2000x320",
			linkAddress:""
		}
	},
	{
		type:"ProductCommon",
		content:{
			products:[]
		}
	},
	{
		type:"TagsOnProductsMobile",
		content: {
			data:[
				{
					tag:"Fashion",
					products:[]
				},
				{
					tag:"Baby",
					products:[]
				},
				{
					tag:"Tops",
					products:[]
				},
				{
					tag:"Women Underware",
					products:[]
				},
				{
					tag:"Women Shoes",
					products:[]
				},
				{
					tag:"Dress",
					products:[]
				},
				{
					tag:"Pants",
					products:[]
				},
				{
					tag:"Skirts",
					products:[]
				},
			]
		}
	},
	{
		type:"FullPageWidthMobile",
		content:{
			products:[
			{
					name:"This is a test product name 1",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:14
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:0
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:0
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:0
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:0
				},
				{
					name:"This is a test product name 2",
					originPrice:23.43,
					promotionPrice:23.43,
					picture:"http://placehold.it/185x185",
					stock:0
				}
			]
		}
	}
];


data.forEach((item)=>{
	if(item.type === "TagsOnProducts"){
		item.content.data.forEach((dataItem)=>{
			for(var i=0;i<6;i++){
				dataItem.products.push({
					name:`product of tag(${dataItem.tag}) number is ${i+1}`,
					favoriteCount:23,
					reviewCount:32,
					price:32.22,
					linkAddress: "",
					picture:`http://placehold.it/288x${Math.ceil(Math.random()*200)+200}`,
				});	
			}
		})
	}else if(item.type === "BannerProduct"){
		for(var i=0;i<6;i++){
			item.content.data[0].products.push({
				name:`This is a test product name ${i+1}`,
				favoriteCount:23,
				reviewCount:32,
				price:32.22,
				linkAddress: "",
				picture:`http://placehold.it/270x270`,
			});
		}
	}else if(item.type === "ProductsFourPerGroup"){
		for(var i=0;i<8;i++){
			item.content.products.push({
				name:`This is a test product name ${i+1}`,
				favoriteCount:23,
				reviewCount:32,
				price:32.22,
				linkAddress:"",
				picture:`http://placehold.it/280x280`,
			});
		}
	}else if(item.type === "BannerWithFourProducts"){
		for(var i=0;i<4;i++){
			item.content.data[0].products.push({
				name: "This is a test product name 1",
				favoriteCount: 23,
				reviewCount: 32,
				price: 32.22,
				picture: "http://placehold.it/270x270",
				linkAddress: "",
				originPrice: 23.22
			})
		}
	}else if(item.type === "TagBannerWithEightProducts"){
		item.content.data.forEach((dataItem)=>{
			for(var i=0;i<8;i++){
				dataItem.data[0].products.push({
					name:`product of tag(${dataItem.tag}) number is ${i+1}`,
					favoriteCount:23,
					reviewCount:32,
					price:32.22,
					linkAddress: "",
					picture:`http://placehold.it/200x200`,
				});	
			}
		})
	}
})

dataMobile.forEach((item)=>{
	if(item.type === "ProductCommon"){
		for(var i=0;i<6;i++){
			item.content.products.push({
				name:`This is a test product name ${i+1}`,
				favoriteCount:23,
				reviewCount:32,
				price:32.22,
				linkAddress: "",
				picture:`http://placehold.it/270x270`,
			});
		}
	}else if(item.type === "TagsOnProductsMobile"){
		item.content.data.forEach((dataItem)=>{
			for(var i=0;i<4;i++){
				dataItem.products.push({
					name:`product of tag(${dataItem.tag}) number is ${i+1}`,
					favoriteCount:23,
					reviewCount:32,
					price:32.22,
					linkAddress: "",
					picture:`http://placehold.it/200x200`,
				});	
			}
		})
	}
})


export var getMockupDataByType = function(type,platform){
	var mockupData;
	if(platform === "Mobile"){
		mockupData = dataMobile.find((item)=>item.type === type);
	}else {
		mockupData = data.find((item)=>item.type === type);
	}
	if(typeof mockupData === "undefined"){
		return null;
	}
	return Object.assign({},mockupData,{});
}