//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    app_name: '美食地图'
    
  },
  //跳转到地图
  showMap: function() {
    
    wx.navigateTo({
      url: '../map/map'
    })
  }
})
