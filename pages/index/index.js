//获取应用实例
var app = getApp();
var API = require('../../api/API.js');
var utils = require('../../utils/util.js');

var mGourmetList = [];
var initFlag = false;
var mLoading = false;
var PAGE_SIZE = 50;
var mPage = 1;
var mIsmore = false;

function setLoading(loading){
  mLoading = loading;
  utils.showLoading(loading);
}

function loadFirstPage(that){
  if(!app.globalData.locationInfo){
    app.getLocationInfo(info=>{
      console.log('先获取位置,',info)
    })
    setTimeout(function(){
      loadFirstPage(that)
    },1500);
    return;
  }

  setLoading(true);
  API.getGourmetByPage(1, PAGE_SIZE, (gourmets)=>{
    console.log('loadFirstPage',gourmets);
    setLoading(false);
    mGourmetList = gourmets;
    mPage = 1;
    mIsmore = true;
    that.setData({
      gourmets: mGourmetList
      ,ismore: mIsmore        
    })
  })
}

Page({
  data: {
    app_name: '美食地图'
    ,ismore: mIsmore
    ,gourmets: mGourmetList
  }
  //跳转到地图
  ,showMap: function() {
    var that = this;
    if(mLoading) return;//等待加载完
    if(mGourmetList.length > 0){
        app.globalData.gourmets = mGourmetList;
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
      url: '/pages/add_gourmet/add_gourmet'
    })
  }

  ,onLoad: function(options) {
    // Do some initialize when page load.
    API.addLocationPoint()
  }
  ,onReady: function() {
    // Do something when page ready.
    initFlag = true;
    loadFirstPage(this);
  }
  ,onShow: function() {
    // Do something when page show.
    if(!initFlag) return;
    if(!app.flags.refresh_index) return;
    app.flags.refresh_index = false;
    loadFirstPage(this);
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
    if(mLoading) return;
    if(!initFlag) return;
    loadFirstPage(this);
  }
  ,onReachBottom: function() {
    // Do something when page reach bottom.
    this.loadMore()
  }
  //详情
  ,gotoDetail: function(e){
    if(mLoading) return;
    var item = e.target.dataset.item;
    if(item){
      wx.navigateTo({
        url: '/pages/detail/detail?item='+JSON.stringify(item)
      })
    }
  }
  ,onShareAppMessage: function () {
    return {
      title: '地道美食地图',
      desc: '发现身边最地道的美食',
      path: '/pages/index/index'
    }
  }

  ,loadMore:function(){
    if(!mIsmore) return;
    wx.showNavigationBarLoading();
    var that = this;
    API.getGourmetByPage(mPage+1, PAGE_SIZE, (gourmets)=>{
      console.log('loadMore',gourmets);
      mIsmore = (gourmets.length > 0);
      mPage++;
      mGourmetList = mGourmetList.concat(gourmets);
      that.setData({
        gourmets: mGourmetList
        ,ismore: mIsmore  
      })
      wx.hideNavigationBarLoading()
    })
  }

  //组织事件冒泡
  ,stopScroll: function(){

  }

})
