var app = getApp();
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');

var markers = [];

Page({
  data: {
    markers: markers
    ,polyline: []
    ,controls: [{}]
    ,longitude: 113.298569
    ,latitude: 23.095207
  }
  ,regionchange(e) {
    console.log(e.type)
  }
  ,markertap(e) {
    console.log(e);
    
    this.setData({
      gourmet: JSON.stringify(app.globalData.gourmetsMap[e.markerId])
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
        })
    }
  }
})