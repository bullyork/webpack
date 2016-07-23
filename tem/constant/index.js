
export const popStatusClear = {
  inputList: [],
  type: '',
  visible: false,
  index:'',
  dataTimePicker:false,
  q: '',
  k: '',
  imgType: '',
  action: '',
  upload: true,
  sort: '',
  preLength: -1,
  info: ''
}
export const categoryConfig = [{
  name: "Women's Clothing",
  id: 5
}, {
  name: "Men's Clothing",
  id: 18
}, {
  name: "Home & Garden",
  id: 866
}, {
  name: "Toys, Kids & Babies",
  id: 2036
}, {
  name: "Shoes, Bags & Accessories",
  id: 10
}, {
  name: "Health & Beauty",
  id: 863
}, {
  name: "Mobiles & Tablets",
  id: 2040
}, {
  name: "Office, Gifts & Stationery",
  id: 2044
}, {
  name: "Sports & Outdoors",
  id: 875
}, {
  name: "Automotives",
  id: 23
}, {
  name: "Jewelry & Watches",
  id: 1000
}]

export const displayPropertyMap = {
price:{
  cname: '价格',
  type: 'range'
},
quantity:{
  cname: '库存',
  type: 'range'
},
weight:{
  cname: '重量',
  type: 'range'
},
isPrime:{
  cname: '是否为prime',
  type: 'radio'
},
isRecommend:{
  cname: '是否为推荐商品',
  type: 'radio'
}
}
export const displayPropertyConfig = [
  {
    cname: '价格',
    name: 'price'
  },
  {
    cname: '库存',
    name: 'quantity'
  },
  {
    cname: '重量',
    name: 'weight'
  },
  {
    cname: '是否为prime',
    name: 'isPrime'
  },
  {
    cname: '是否为推荐商品',
    name: 'isRecommend'
  }
]
export const conditionFieldType ={
  0:'其他',
  1: '类目',
  2: '属性',
  3: '基础类型'
}
export const conditionOperator ={
  0: '其他',
  1: '相等',
  2: '相等',
  3: '相等',
  4: '小于此值',
  5: '小于此值',
  6: '小于此值',
  7: '大于此值',
  8: '大于此值',
  9: '大于此值',
  10: '前缀',
  11: '包含此值'
}
export const serviceType =['other','buy for me','ship for me','ezbuy','prime']
export const serviceTypeMap = {
  'other':1,
  'buy for me':2,
  'ship for me':4,
  'ezbuy':8,
  'prime':16
}
