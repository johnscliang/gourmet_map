//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    app_name: '美食地图'
    ,points:[
      {
        name: '阿婆牛杂'
        ,reporter: 'Amy'
        ,comments:[{'a':1},{},{}]
        ,create_time: '2017-01-01'
        ,longitude: 110.290740
        ,latitude: 21.610395
      }
      ,{
        name: '陈伯拉肠'
        ,reporter: 'Bob'
        ,comments:[{'a':1},{},{}]
        ,create_time: '2017-01-01'
        ,longitude: 110.290203
        ,latitude: 21.609637
      }
      ,{
        name: '湿炒牛河'
        ,reporter: 'Cute'
        ,comments:[{'a':1},{},{}]
        ,create_time: '2017-01-01'
        ,longitude: 110.292842
        ,latitude: 21.611153
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
