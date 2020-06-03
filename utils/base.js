import {config} from './config.js'
export class base{
  constructor(){
    this.baseRequestUrl = config.restUrl
  }
  //发送请求获取数据
  request(params){
    var url = this.baseRequestUrl + params.url
    if (!params.type) {
      params.type = 'GET';
    }
    qq.request({
      url: url,
      data: params.data,
      method: params.type,
      success: function (res) {
        if(res.data.code!=200) {
          return qq.showToast({
            title: res.data.msg,
            icon: 'none',
            success: (cer) => {
              params.errCallBack && params.errCallBack(res.data.data);
            }
          });
        }
        params.sCallBack && params.sCallBack(res.data.data);
      },
      fail: function (err) {
        return qq.showToast({title: err,icon:'none'})
      }
    });
  }
}