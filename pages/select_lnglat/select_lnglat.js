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
  //change
  ,change: function(e){
      that.setData({
          longitude: 110.290203
          ,latitude: 21.6096
          ,markers:[
            {
            id: 0
            ,iconPath: "../../imgs/ic_position.png"
            ,longitude: 110.290203
            ,latitude: 21.6096
            ,width: 30
            ,height: 30
            }
          ]
        })
  }
  ,regionchange(e) {
    alert(e.type)
  }
  ,markertap(e) {
    alert(e.markerId)
  }
})