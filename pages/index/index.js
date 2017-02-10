//获取应用实例
var app = getApp();
var utils = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');

var initFlag = false;
var mLoading = false;

function setLoading(loading){
  mLoading = loading;
  utils.showLoading(loading);
}

// get gourmets 
function getGourmet(cb){
  setLoading(true)
  app.getLocationInfo(locationInfo=>{

       var Gourmet = Bmob.Object.extend("gourmet");
       console.log('locationInfo',locationInfo);
        var point = new Bmob.GeoPoint({
          latitude: locationInfo.latitude
          ,longitude: locationInfo.longitude
        });
        var southwestOfSF = new Bmob.GeoPoint(
          locationInfo.latitude - 4.5 , locationInfo.longitude - 5.4);

        var northeastOfSF = new Bmob.GeoPoint(
          locationInfo.latitude + 3.1, locationInfo.longitude + 3.9);

        // 创建查询
        var query = new Bmob.Query(Gourmet);
        // location附近的位置
        //query.near("location", point);
        query.withinGeoBox("location", southwestOfSF, northeastOfSF);
        //query.withinKilometers("location", point, 800);
        // 返回10个地点数据
        query.limit(50);
        //
        //query.skip(pagesize * (page))
        //按修改时间
        query.descending("updatedAt");
        // 查询
        query.find({
          success: function(gourmets) {
              var jsonArray = JSON.parse(JSON.stringify(gourmets));
              app.globalData.gourmets = jsonArray;
              for(var x in jsonArray){
                  app.globalData.gourmetsMap[jsonArray[x].objectId] = jsonArray[x];
              }
              //
              cb(app.globalData.gourmets);
              setLoading(false)
          }
           ,error: function(error) {
               setLoading(false)
               console.log('find error',error);
            }
        });
    })
}

Page({
  data: {
    app_name: '美食地图'
    ,gourmets:[]
  }
  //跳转到地图
  ,showMap: function() {
    var that = this;
    if(mLoading) return;//等待加载完
    if(app.globalData.gourmets.length > 0){
        gotoMap()
    }else{
        // 没有点的情况
        wx.showModal({
          title: "周围没有推荐的地道美食",
          content: "不如你来推荐一个？",
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.addPoint()
            }else{
               console.log('用户点击取消')
               gotoMap()
            }
          }
        })
    }

    function gotoMap(){
      wx.navigateTo({
          url: '../map/map'
      })
    }

  }
  //添加美食点点
  ,addPoint: function(){
    wx.navigateTo({
      url: '../select_lnglat/select_lnglat'
    })
  }

  ,onLoad: function(options) {
    // Do some initialize when page load.
    
  }
  ,onReady: function() {
    var that = this;
    // Do something when page ready.
    initFlag = true;
    getGourmet((gourmets)=>{
      console.log('onReady',gourmets);
      that.setData({
        gourmets: gourmets
      })
    })
  }
  ,onShow: function() {
    // Do something when page show.
    if(!initFlag) return;
    var that = this;
    getGourmet((gourmets)=>{
      console.log('onShow',gourmets);
      that.setData({
        gourmets: gourmets
      })
    })
  }
  ,onHide: function() {
    // Do something when page hide.
  }
  ,onUnload: function() {
    // Do something when page close.
  }
  ,onPullDownRefresh: function() {
    // Do something when pull down.
    wx.stopPullDownRefresh();
    var that = this;
    getGourmet((gourmets)=>{
      console.log('onShow',gourmets);
      that.setData({
        gourmets: gourmets
      })
    })
  }
  ,onReachBottom: function() {
    // Do something when page reach bottom.
  }
  //详情
  ,gotoDetail: function(e){
    if(mLoading) return;
    var id = e.target.dataset.id;
    console.log('gotoDetail',e.target.dataset);
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  }

})
