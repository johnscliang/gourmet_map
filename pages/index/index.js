//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    app_name: '美食地图'
    ,points:[
      {
        name: '阿婆牛杂'
      }
      ,{
        name: '陈伯拉肠'
      }
      ,{
        name: '湿炒牛河'
      }
    ]
  },
  //跳转到地图
  showMap: function() {
    wx.navigateTo({
      url: '../map/map'
    })
  }
})
