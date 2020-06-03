import {auth} from './auth.js';

export default new class product extends auth {
  constructor() {
    super();
  }
  //获取产品列表
  getList(param, callback) {
    this.request({ url: 'index/v1/product/search', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取产品详情
  getDetail(param, callback) {
    this.request({ url: 'index/v1/product/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //兑换
  conversion(param, callback){
    this.request({ url: 'index/v1/product/conversion', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}