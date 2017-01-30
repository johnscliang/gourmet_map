var app = getApp()
var Bmob = require('../../utils/bmob.js');
var add_gourmet = require('./add_gourmet.js');
var CS = require('../../utils/CS.js');

var combinePage = {
    data:{
      map_width: 380
      ,map_height: 380
      //已添加的图片个数
      ,pics_number: 0
      ,upload_progress: 0
      ,urls:[]
    }
    //show current position
    ,onLoad: function(){
    var that = this;
    // 获取定位，并把位置标示出来
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
    // 动态设置map的宽和高
    app.getSystemInfo((width, height) => {
      console.log('select_lnglat',width, height);
      that.setData({
           map_width: width
          ,map_height: width
          ,controls: [{
            id: 1,
            iconPath: '../../imgs/ic_location.png',
            position: {
              left: width/2 - 8,
              top: width/2 - 16,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        })
    })

  }
  //获取中间点的经纬度，并mark出来
  ,getLngLat: function(){
      var that = this;
      this.mapCtx = wx.createMapContext("map4select");
      this.mapCtx.getCenterLocation({
        success: function(res){

            var geopoint = {
              longitude: res.longitude
              ,latitude: res.latitude
            }
            //存存
            try {
              console.log('cunccccc',CS.KEY_GEOPOINT)
              console.log('vvvvvvvvv',JSON.stringify(geopoint))
                wx.setStorageSync(CS.KEY_GEOPOINT, JSON.stringify(geopoint))
            } catch (e) {
                console.log('e',e)
            }

            that.setData({
            longitude: geopoint.longitude
            ,latitude: geopoint.latitude
            ,markers:[
              {
              id: 0
              ,iconPath: "../../imgs/ic_position.png"
              ,longitude: geopoint.longitude
              ,latitude: geopoint.latitude
              ,width: 30
              ,height: 30
              }
            ]
          })

        }
      })
  }
  ,regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
      if(e.type == 'end'){
          this.getLngLat()
      }
  }
}

//拓展
Object.extend(combinePage, add_gourmet);
//
Page(combinePage);