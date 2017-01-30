var app = getApp()

Page({
  data: {
    markers: [
      {
        id: 0
        ,iconPath: "../../imgs/ic_position.png"
        ,longitude: 110.290740
        ,latitude: 21.610395
        ,width: 30
        ,height: 30
      }
      ,{
        id: 1
        ,iconPath: "../../imgs/ic_position.png"
        ,longitude: 110.290203
        ,latitude: 21.609637
        ,width: 30
        ,height: 30
      }
      ,{
        id: 2
        ,iconPath: "../../imgs/ic_position.png"
        ,longitude: 110.292842
        ,latitude: 21.611153
        ,width: 30
        ,height: 30
      }
    ]
    ,polyline: []
    ,controls: [{}]
    ,longitude: 113.298569
    ,latitude: 23.095207
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
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
    app.getSystemInfo(width, height => {
      that.setData({
           map_width: width
          ,map_height: height
        })
    })
  }
})