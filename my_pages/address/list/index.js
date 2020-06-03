// pages/my/address/list/index.js
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },
  /**
   * 添加或修改地址
   */
  goDetail:function(e){
    let page = '/my_pages/address/detail/index'
    let info = this.data.data[e.currentTarget.dataset.index]
    page = page + '?id=' + info.id + '&consignee_name=' + info.consignee_name + '&consignee_tel=' + info.consignee_tel + '&province=' + info.province + '&city=' + info.city + '&county=' + info.county + '&address=' + info.address + '&is_default=' + info.is_default
    wx.navigateTo({
      url: page,
    })
  },
  /**
   * 设置默认地址
   */
  setDefault:function(e){
    let info = this.data.data[e.currentTarget.dataset.index]
    if (info.is_default!=1){
      for (let i = 0; i < this.data.data.length; i++) {
        if (e.currentTarget.dataset.index == i) {
          this.data.data[i].is_default = 1
        } else {
          this.data.data[i].is_default = 0
        }
      }
      this.setData(this.data)
      userAddress.setDefault({id:info.id})
    }
  },
  /**
   * 页面加载触发
   */
  onLoad:function(){
    this.getAddressList();
  },
  /**
   * 获取地址列表
   */
  getAddressList: function () {
    userAddress.getList((res) => {
      this.setData({ data: res})
    })
  },
  /**
   * 页面显示触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh ='my_pages/address/list/index') {
      getApp().globalData.is_refresh = null;
      this.getAddressList();
    }
  }
})