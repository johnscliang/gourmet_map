require('utils/bmob_init.js');
var Bmob = require('utils/bmob.js');

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    getUserInfoByNetwork(this, userinfo => {
        console.log('onLauch',userinfo)
    })
  }
  ,getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      getUserInfoByNetwork(that,cb)
    }
  }
  //get locationInfo
  ,getLocationInfo: function(cb){
    var that = this;
    if(this.globalData.locationInfo){
        cb(this.globalData.locationInfo)
    }else{
        wx.getLocation({
          type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
            that.globalData.locationInfo = res;
            cb(that.globalData.locationInfo)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
  }
  ,getSystemInfo:getSystemInfo
  
  ,globalData:{
    userInfo:null
    ,locationInfo: null
    ,gourmets: []
    ,gourmetsMap:{}
  }

  ,flags:{
    refresh_index: false
  }
})

//网络获取用户信息
function getUserInfoByNetwork(that,cb){

  wx.login({
  success: function(res) {
    if (res.code) {
        Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
          success: function(userData) {
              //console.log('userData',userData) 
              wx.getUserInfo({
                  success: function(result) {
                    var userInfo = result.userInfo;
                    userInfo.openid = userData.openid;
                    that.globalData.userInfo = userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo)  
                    //开始注册用户
                    var WXUser = Bmob.Object.extend("wxuser");
                    var wxuser = new WXUser();
                    wxuser.set("openid",userData.openid);
                    wxuser.set("nickname", userInfo.nickName);
                    wxuser.set("avatar", userInfo.avatarUrl);
                    wxuser.set("city", userInfo.city);
                    wxuser.set("province", userInfo.province);
                    wxuser.set("gender", userInfo.gender);
                    //添加数据，第一个入口参数是null
                    wxuser.save(null, {
                        success: function(result) {
                          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                            console.log("wxuser创建成功, objectId:"+result.id);
                        },
                        error: function(result, error) {
                          // 添加失败
                          console.log('创建user失败');
                        }
                    });

                  }
              })                       
          },
          error: function(error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
          }
      });

    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  }
})
}

//获取屏幕信息
function getSystemInfo(cb){
  wx.getSystemInfo({
      success: function(res) {
        cb(res.windowWidth, res.windowHeight)
      }
    })
}

//拓展对象
Object.extend = function () {
  var args = arguments;
  if (args.length < 2) return;
  var firstObj = args[0];
  console.log('first',firstObj);
  for(var i = 1; i < args.length; i++){
      for(var x in args[i]){
          firstObj[x] = args[i][x];
      }
  }
  console.log('first',firstObj);
  return firstObj;
}