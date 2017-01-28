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
      console.log(e);
      this.setData({
          longitude: e.target.longitude
          ,latitude: e.target.latitude
          ,markers:[
            {
            id: 0
            ,iconPath: "../../imgs/ic_position.png"
            ,longitude: e.target.longitude
            ,latitude: e.target.latitude
            ,width: 30
            ,height: 30
            }
          ]
        })
  }
  ,regionchange(e) {
      console.log(e)
  }
  ,markertap(e) {
    console.log(e)
  }
})