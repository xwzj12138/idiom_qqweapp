// pages/index/index/index.js
import user from './../../../model/user.js'
import idiom from '../../../model/idiom.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    videoAd:null,
    interstitialAd:null,
    show_hint:false,
    show_answer_hint:{status:false,gold:0},
    userinfo: {},
    navList: [{ "name": "答题排名" }],
    idiom_info: { id: 0, idiom_name: [], answer_list:[]},
    rank_user_list: { current_page: 0, data: [], last_page: 1, ad_number:8}
  },
  /**
   * 关闭答题提示窗
   */
  closHint:function(){
    this.setData({ show_answer_hint: { status: false, gold: 0}})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIdiomInfo();
    this.getuserinfo();
    this.loadVidelAd();
    this.getRankList();
    this.loadInterstitialAd();
  },
  /**
   * 获取成语信息
   */
  getIdiomInfo:function(){
    idiom.getIdiom((res)=>{
      this.setData({ idiom_info:res})
    });
  },
  /**
   * 授权登录成功回调，获取奖品列表
   */
  getuserinfo: function () {
    //获取用户信息
    wx.showLoading({ title: '数据加载中' });
    user.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res });
      wx.hideLoading();
    });
  },
  
  /**
   * 更新用户信息
   */
  updateUserInfo(e) {
    let param = { nickname: e.detail.userInfo.nickName, avatar: e.detail.userInfo.avatarUrl, gender: e.detail.userInfo.gender };
    user.updateUserInfo(param, (res) => {
      this.data.userinfo.nickname = param.nickname
      this.data.userinfo.avatar = param.avatar
      this.data.userinfo.gender = param.gender
      this.setData(this.data)
      wx.setStorage({
        key: 'token',
        data: this.data.userinfo,
      })
    });
  },
  /**
   * 选择答案
   */
  selectAnswer:function(e){
    //判断答题是否正确
    if (this.data.idiom_info.answer_list[e.currentTarget.dataset.index].whether==false){
      //答错题目重新选择
      this.setData({ show_hint:true});
    }
    let param = { id: this.data.idiom_info.id, index: e.currentTarget.dataset.index}
    idiom.answer(param,(res)=>{
      if (res.idiom_info){
        if (this.data.interstitialAd && res.show_interstitialAd){
          //显示插屏广告
          this.data.interstitialAd.show().catch((err) => { });
        }else{
          //显示弹窗
          res.show_answer_hint = { status: true, gold: res.userinfo.gold - this.data.userinfo.gold };
        }
      }
      if (res.idiom_info) res.show_hint = false;
      this.setData(res);
    });
  },
  /**
   * 显示广告
   */
  showAd:function(){
    if (this.data.videoAd) {
      this.data.videoAd.show().catch(() => {
        // 失败重试
        this.data.videoAd.load()
          .then(() => this.data.videoAd.show())
          .catch(err => {
            wx.showToast({ title: '网络异常', icon: 'none' })
          });
      });
    }
  },
  /**
   * 加载视频广告插件
   */
  loadVidelAd() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (qq.createRewardedVideoAd) {
      let videoAd = wx.createRewardedVideoAd({
        adUnitId: '50ff2ff35f69a1f8fbc4c73357269cca'
      })
      videoAd.onLoad(() => {
        this.data.videoAd = videoAd;
      });
      videoAd.onError((err) => {
        wx.showToast({ title: err.errMsg, icon: 'none' })
      })
      videoAd.onClose((res) => {
        // isEnded：true有效观看完整视屏 false：无效观看
        if (res.isEnded) {
          this.signInSuccess();
        } else {
          wx.showToast({ title: '获取失败', icon: 'none' })
        }
      })
    }
  },
  /**
   * 加载插屏广告
   */
  loadInterstitialAd:function(){
    if (wx.createInterstitialAd) {
      let interstitialAd = wx.createInterstitialAd({
        adUnitId: '88a5982f09e423065a3a32abfe4b6d7d'
      })
      interstitialAd.onLoad(() => { this.data.interstitialAd = interstitialAd;})
      interstitialAd.onError((err) => { this.data.interstitialAd = null;})
      interstitialAd.onClose(() => { })
    }
  },
  /**
   * 记录签到（观看视频）
   */
  signInSuccess: function () {
    this.data.userinfo.integral +=100;
    this.setData({userinfo:this.data.userinfo})
    user.video((res) => {
      this.setData({ userinfo: res });
    });
  },
  /**
   * 获取排名列表
   */
  getRankList:function(){
    if (this.data.rank_user_list.current_page >= this.data.rank_user_list.last_page){
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = {page:this.data.rank_user_list.current_page+1}
    user.getRank(param,(res)=>{
      if(res.current_page>1){
        res.data = [...this.data.rank_user_list.data,...res.data];
      }
      this.setData({ rank_user_list:res})
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRankList();
  },
  /**
   * 页面显示触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh =='pages/index/index/index') {
      getApp().globalData.is_refresh = null;
      user.myinfo((res)=>{
        this.setData({ userinfo:res})
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '[微信红包]答题免费兑实物商品,分分钟用名牌',
      path: '/pages/share/help/index?share_uid=' + this.data.userinfo.uid
    }
  }
})