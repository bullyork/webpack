
import Config from '../../common/config'
import Fetch from 'fetch.io'

const PRE = Config.API_HP_ARRANGE
const request = new Fetch({
  prefix: PRE
})
const request3 = new Fetch({
  prefix: '/api/shops/EsOpCid'
})
const request2 = new Fetch({
  prefix: '/api/bootybay/BootyBay'
})
const request5 = new Fetch({
  prefix: '/api/EZSpiderSearch'
})
const request4 = new Fetch({
  prefix: '/api/AdminSpikeDisplaySet'
})
const request6 = new Fetch({
  prefix: '/api/Voucher'
})
const request7 = new Fetch({
  prefix: '/api/Popup'
})
const request8 = new Fetch({
  prefix: '/api/EZDelivery'
})
const request9 = new Fetch({
  prefix: '/api/RedPacket_WebAPI'
})
const request10 = new Fetch({
  prefix: '/api/D2D'
})
const request11 =  new Fetch({
  prefix: '/api/ProductChangelog'
})
export {
  request,
  request2,
  request3,
  request5,
  request4,
  request6,
  request7,
  request8,
  request9,
  request10,
  request11
}
