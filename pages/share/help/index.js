// pages/share/help/index.js
import user from '../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_user: { uid: 0},
    userinfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.share_user.uid = options.share_uid;
    this.setData({ share_user: this.data.share_user});
    this.getuserinfo();
  },
  /**
  * 授权登录成功回调，获取奖品列表
  */
  getuserinfo: function () {
    wx.showLoading({title: '数据加载中'});
    //获取用户信息
    user.getByIdUserInfo({ id: this.data.share_user.uid }, (res) => {
      this.setData({ userinfo: res.user, share_user: res.share_user });
      wx.hideLoading();
    });
  },
  /**
   * 助力
   */
  helpFriend:function(){
    user.help({ id: this.data.share_user.uid},(res) => {
      wx.reLaunch({url: '/pages/index/index/index'});
    },(err)=>{
      setTimeout(function () {
        wx.reLaunch({ url: '/pages/index/index/index' });
      }, 1500)
    });
  }
})