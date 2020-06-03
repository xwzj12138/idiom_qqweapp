import { auth } from './auth.js';


export default new class user extends auth {
  constructor() {
    super();
  }
  //获取缓存的用户信息
  getGlobalUserinfo(callback) {
    if (wx.getStorageSync('token')){
      return this.myinfo(callback);
    }
    let appinfo = getApp();
    if (appinfo.globalData.userInfo) {
      return callback(appinfo.globalData.userInfo)
    }
    return this.login(callback);
  }
  //获取用户信息
  myinfo(callback) {
    this.request({
      url: 'index/v1/user/getInfo',
      type: 'POST',
      data: {},
      sCallBack: (res) => {
        getApp().globalData.userInfo = res;
        callback && callback(res);
      }
    });
  }
  //获取排名列表
  getRank(param,callback) {
    this.request({ url: 'index/v1/user/getRank', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个用户的信息
  getByIdUserInfo(param, callback) {
    this.request({ url: 'index/v1/user/find', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //给好友助力
  help(param, callback, errCallback = null) {
    this.request({
      url: 'index/v1/user/help', type: 'POST', data: param,
      sCallBack: (res) => { callback(res) },
      errCallBack: (err) => { errCallback && errCallback(err); }
    });
  }
  //修改用户信息
  updateUserInfo(param,callback){
    this.request({ url: 'index/v1/user/update', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //观看视频
  video(callback) {
    this.request({ url: 'index/v1/user/video', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
}