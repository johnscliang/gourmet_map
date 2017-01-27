var app = getApp()

Page({
  data: {
    markers: []
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
  }
})