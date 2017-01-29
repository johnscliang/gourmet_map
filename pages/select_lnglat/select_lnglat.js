var app = getApp()

Page({
    data:{
      map_width: 380
      ,map_height: 380
    }
    //show current position
    ,onLoad: function(){
    var that = this;
    app.getLocationInfo(function(locationInfo){
        console.log('map',locationInfo);
        that.setData({
          longitude: locationInfo.longitude
          ,latitude: locationInfo.latitude
          ,markers:[
            {
            id: 0
            ,iconPath: "../../imgs/ic_position.png"
            ,longitude: locationInfo.longitude
            ,latitude: locationInfo.latitude
            ,width: 30
            ,height: 30
            }
          ]
        })
    })

    //set the width and height
    wx.getSystemInfo({
      success: function(res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        that.setData({
           map_width: res.windowWidth
          ,map_height: res.windowWidth
          ,controls: [{
            id: 1,
            iconPath: '../../imgs/ic_location.png',
            position: {
              left: res.windowWidth/2 - 8,
              top: res.windowWidth/2 - 16,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })
      }
    })

  }
  //获取中间点的经纬度
  ,getLngLat: function(){
      var that = this;
      this.mapCtx = wx.createMapContext("map4select");
      this.mapCtx.getCenterLocation({
        success: function(res){

            that.setData({
            longitude: res.longitude
            ,latitude: res.latitude
            ,markers:[
              {
              id: 0
              ,iconPath: "../../imgs/ic_position.png"
              ,longitude: res.longitude
              ,latitude: res.latitude
              ,width: 30
              ,height: 30
              }
            ]
          })

        }
      })
  }
  ,regionchange(e) {
      if(e.type == 'end'){
          this.getLngLat()
      }
  }
  ,markertap(e) {
    console.log(e)
  }
})