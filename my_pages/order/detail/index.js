// pages/my/order/detail/index.js
import order from '../../../model/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{id:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.data.id = options.id
    this.setData(this.data)
    this.getOrderDetail();
  },
  /**
   * 获取订单详情
   */
  getOrderDetail:function(){
    let param = {id:this.data.data.id};
    order.detail(param,(res)=>{
      this.setData({data:res})
    });
  }
})