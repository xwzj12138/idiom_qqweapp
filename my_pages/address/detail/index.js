// pages/my/address/detail/index.js
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    form: {
      id:0,
      consignee_name: '',
      consignee_tel: '',
      province:'',
      city:'',
      county:'',
      address: '',
      is_default: ''
    }
  },
  /**
     * 设置输入的值
     */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value
    this.setData(this.data)
  },
  /**
   * 选择地址
   */
  bindRegionChange:function(e){
    this.data.form.province = e.detail.value[0]
    this.data.form.city = e.detail.value[1]
    this.data.form.county = e.detail.value[2]
    this.setData({ region: e.detail.value, form: this.data.form})
  },
  /**
   * 提交数据
   */
  handleClick: function (e) {
    if (this.data.form.consignee_name == '') return wx.showToast({ title: '请输入收货人名称', icon: 'none' });
    if (this.data.form.consignee_name.length > 30) return wx.showToast({ title: '收货人名称不能超过30字符', icon: 'none' });
    if (this.data.form.consignee_tel=='') return wx.showToast({ title: '请输入收件人电话', icon: 'none' });
    if (this.data.form.consignee_tel.length > 15) return wx.showToast({ title: '收件人电话错误', icon: 'none' });
    if (this.data.form.province == ''|| this.data.form.city == ''||this.data.form.county == '') return wx.showToast({ title: '请选择省市区', icon: 'none' });
    if (this.data.form.address=='') return wx.showToast({ title: '请输入详细地址', icon: 'none' });
    if(this.data.form.id){
      return userAddress.update(this.data.form, (res) => {
        getApp().globalData.is_refresh = 'my_pages/address/list/index';
        wx.navigateBack({});
      })
    }
    return userAddress.add(this.data.form, (res) => {
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    })
  },
  /**
   * 删除数据
   */
  delAddress:function(){
    userAddress.del({ id: this.data.form.id },(res)=>{
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({ form:options});
    }
  }
})