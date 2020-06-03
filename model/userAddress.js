import { auth } from './auth.js';

export default new class address extends auth {
  constructor() {
    super();
  }
  //获取地址列表
  getList(callback) {
    this.request({ url: 'index/v1/address/get', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //添加地址
  add(param, callback) {
    this.request({ url: 'index/v1/address/add', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //修改地址
  update(param, callback) {
    this.request({ url: 'index/v1/address/update', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //删除地址
  del(param, callback) {
    this.request({ url: 'index/v1/address/del', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //设置默认地址
  setDefault(param, callback) {
    this.request({ url: 'index/v1/address/setDefault', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } })
  }
  //获取默认地址
  getDefault(callback) {
    this.request({ url: 'index/v1/address/getDefault', type: 'POST', data: {}, sCallBack: (res) => { callback && callback(res); } })
  }
}