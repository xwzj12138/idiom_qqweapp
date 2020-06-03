// my_pages/product/detail/index.js
import product from '../../../model/product.js'
import userAddress from '../../../model/userAddress.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{ "name": "商品详情" }],
    default_address:null,
    product_info:{id:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.product_info.id = options.id;
    this.getProductDetail();
  },

  /**
   * 获取商品详情
   */
  getProductDetail: function () {
    let param = {id:this.data.product_info.id};
    product.getDetail(param,(res)=>{
      this.setData({ product_info:res})
    });
  },

  /**
   * 确认兑换
   */
  submit: function () {
    if(this.data.default_address==null) return wx.showToast({title: '请设置收货地址!',icon:'none'});
    if (this.data.product_info.stock <= 0) return wx.showToast({ title: '库存不足!', icon: 'none' });
    let param = {id:this.data.product_info.id};
    product.conversion(param,(res)=>{
      getApp().globalData.is_refresh = 'pages/index/index/index';
      wx.showToast({ title: '兑换成功!'});
      wx.navigateTo({url: '/my_pages/order/list/index'});
    });
  },

  /**
   * 页面显示时触发
   */
  onShow: function () {
    userAddress.getDefault((res)=>{
      this.setData({ default_address:res})
    });
  }
})