import {base} from '../utils/base.js';

export default new class login extends base {
  constructor() {
    if(!login.instance){
      super();
      login.instance = this;
    }
    return login.instance;
  }
  getStorageSync(callback) {
    let storeage = wx.getStorageSync('token');
    if (storeage && (storeage.expire_time-5*60) > (Date.parse(new Date()))/1000) {
      this.is_request = false;
      return callback && callback(storeage);
    }
    if (this.is_request) {
      return setTimeout(() => {
        this.getStorageSync(callback)
      }, 100);
    }
    this.is_request = true;
    this.authLogin(callback);
  }
  authLogin(callback) {
    wx.login({
      success: res => {
        let app = getApp();
        this.request({
          url: 'other/v1/login/qq_auth',
          type: 'POST',
          data: { code: res.code, source: app.globalData.source, share_uid: app.globalData.share_uid},
          sCallBack: (result) => {
            wx.setStorageSync('token',result);
            callback && callback(result)
          }
        });
      }
    })
  }
}