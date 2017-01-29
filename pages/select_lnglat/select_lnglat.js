var app = getApp()

Page({
    data:{
       
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
      console.log(e)
  }
  ,markertap(e) {
    console.log(e)
  }
})