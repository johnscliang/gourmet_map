var app = getApp();
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');

var markers = [];
var gourmetsMap = {};

Page({
  data: {
    markers: markers
    ,polyline: []
    ,controls: [{}]
    ,longitude: 113.298569
    ,latitude: 23.095207
    ,hotList: [
      {
        pic: '/imgs/temp.jpg',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/imgs/temp.jpg',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/imgs/temp.jpg',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/imgs/temp.jpg',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/imgs/temp.jpg',
        title: '玻璃棧道',
        desc: '22W人去過'
      }
    ]
  }
  ,regionchange(e) {
    console.log(e.type)
  }
  ,markertap(e) {
    console.log(e);
    //
    var gourmet = gourmetsMap[e.markerId];
    this.setData({
      gourmet: gourmet
      ,show: true
    })
  }
  ,controltap(e) {
    console.log(e.controlId)
  }
  ,onLoad: function(){
    var that = this;
    app.getLocationInfo(function(locationInfo){
        console.log('map',locationInfo);
        that.setData({
          longitude: locationInfo.longitude
          ,latitude: locationInfo.latitude
        })
    })
    //设置地图大小
    app.getSystemInfo((width, height) => {
      that.setData({
           map_width: width
          ,map_height: width
        })
    })

    //
    var gourmets = app.globalData.gourmets;
    for(var x in gourmets){
        //
        gourmetsMap[gourmets[x].objectId] = gourmets[x];
        var marker = {
          id: gourmets[x].objectId
          ,iconPath: "../../imgs/ic_position.png"
          ,longitude: gourmets[x].location.longitude
          ,latitude:  gourmets[x].location.latitude
          ,width: 30
          ,height: 30
        }
        console.log('marker',marker);
        markers.push(marker);
        that.setData({
          markers: markers
          ,gourmets: gourmets
        })
    }
  }

  //
  ,gotoDetail: function(e){
    var item = e.target.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?item='+JSON.stringify(item)
    })
  }
})