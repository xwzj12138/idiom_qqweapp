import { auth } from './auth.js';

export default new class idiom extends auth{
  constructor() { super(); }
  //获取成语信息
  getIdiom(callback) {
    this.request({ url: 'index/v1/idiom/find', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
  //答题
  answer(param,callback) {
    this.request({ url: 'index/v1/idiom/answer', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}