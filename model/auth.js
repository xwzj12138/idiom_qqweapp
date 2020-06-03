import {base} from '../utils/base.js';
import login from './login.js';

export class auth extends base {
  constructor(){
    super();
  }
  login(callback){
    login.getStorageSync((storeage) => {
      callback(storeage);
    });
  }
  request(params){
    login.getStorageSync((storeage)=>{
      params.data.token = storeage.token
      super.request(params);
    });
  }
  http(params) {
    super.request(params);
  }
}