// my_pages/product/list/index.js
import product from '../../../model/product.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page: 0, data: [], last_page: 1, show_loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList();
  },

  /**
   * 获取商品列表
   */
  getProductList: function () {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1 }
    product.getList(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getProductList();
  }
})