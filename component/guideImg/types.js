// typeId
  // 2 prime banner
  // 4 register
  // 8 login


var types = [{
  typeId:8,
  key:"_login_",
  value: "Login",
  path:"/Account/Login"
},{
  typeId:4,
  key:"_register_",
  value: "Register",
  path:"/Account/Register"
}];

export var getTypeKey = (typeId)=>{
  for(let i=0; i<types.length; i++){
    let type = types[i];
    if(type.typeId === typeId){
      return type.key;
    }
  }
}


export var getTypeValue = (typeId)=>{
  for(let i=0; i<types.length; i++){
    let type = types[i];
    if(type.typeId === typeId){
      return type.value;
    }
  }
}

export var getTypePath = (typeId) =>{
  for(let i=0; i<types.length; i++){
    let type = types[i];
    if(type.typeId === typeId){
      return type.path;
    }
  }
}

export default types