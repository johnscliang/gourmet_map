var app = getApp();
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');
var API = require('../../api/API.js');

var gourmet = null;
var mComments = [];
//
const PAGE_SIZE = 10;
var mPage = 1;
var mIsmore = true;
var mLoading = false;
var mIsSupportOk = false;

function setLoading(loading){
  mLoading = loading;
  utils.showLoading(loading);
  loading ? wx.showNavigationBarLoading():wx.hideNavigationBarLoading()
}

var loadSupportSataus = function(gourmetID, that){
  API.getGourmetSupportInfo(gourmetID,(evaluation)=>{
    console.log('evaluation',JSON.stringify(evaluation));
    if(!evaluation || (evaluation && !evaluation.has)){ //没有评价过
      mIsSupportOk = true;
    }
    if(evaluation && evaluation.has){
      toggleSupport(that,evaluation.support)
    }
  })
}

var toggleSupport = function(that,support){
  if(support){
        that.setData({
         ic_support: "/imgs/ic_supported.png"
        })
      }else{
        that.setData({
          ic_unsupport: "/imgs/ic_unsupported.png"
        })
      }
}

//comments
var Comment = Bmob.Object.extend("comment");
function getComments(page, cb){
    setLoading(true);
    var query = new Bmob.Query(Comment);
    query.equalTo("gourmet_id", gourmet.objectId);
    query.descending("updatedAt");
    query.limit(PAGE_SIZE);
    query.skip(PAGE_SIZE * (page - 1));
    //关联查询 头像 昵称
    query.find({
      success: function(results) {
          setLoading(false);
          // console.log(page, results);
          var jsonData = JSON.parse(JSON.stringify(results));
          //切换时间为友好时间
          for(var x in jsonData){
            console.log((jsonData[0].create_time));
            jsonData[x].create_time_tag = utils.dateStr(jsonData[x].create_time)
          }
          if(cb) cb(jsonData)
      },
      error: function(error) {
        setLoading(false);
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
}

Page({
  data: {
    urls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000
    //
    ,hide_loadmore: true
    ,ic_support: "/imgs/ic_support.png"
    ,ic_unsupport: "/imgs/ic_unsupport.png"
  }
  ,onLoad: function(option){
      var that = this;
      console.log('option',option);
      if(option.item){
        gourmet = JSON.parse(option.item);
        that.setData({
          gourmet: gourmet 
        })
        loadFirstPage(this);
        loadSupportSataus(gourmet.objectId, that);
      }else{
        setLoading(true);
        var Gourmet = Bmob.Object.extend("gourmet");
        var query = new Bmob.Query(Gourmet);
        query.get(option.id, {
          success: function(result) {
            setLoading(false);
            gourmet = JSON.parse(JSON.stringify(result));
            that.setData({
              gourmet: gourmet 
            })
            loadFirstPage(this);
            loadSupportSataus(gourmet.objectId, that);
          },
          error: function(object, error) {
            // 查询失败
            setLoading(false);
            utils.showModal('错误','请求出错');
          }
        });
      }
      
      //
      app.getSystemInfo((width, height) => {
        that.setData({
          img_width: width
          ,img_height: width * 9/16
          })
      })  
      //
      mIsSupportOk = false;//防止用户马上点赞
  }

  ,preview: function(){
      if(gourmet){
        wx.previewImage({
            current: gourmet.urls[0], // 当前显示图片的http链接
            urls: gourmet.urls // 需要预览的图片http链接列表
        })
      }
  }

  ,inputComment:function(e){
       this.setData({
         commContent:e.detail.value
       })
  }

  ,addComment: function(e){
      var that = this;
      var content = this.data.commContent;
      console.log(content);
      if(content == "" || content == null){
          return utils.showModal('错误','请输入评论')
      }
      app.getUserInfo(userinfo=>{
        //
        utils.showLoading("loading")
        addComment(gourmet.objectId, userinfo, content, (ok,newComment)=>{
          if(ok){
            that.setData({
              //新增成功之后，清空输入框
              commContent: ""
              ,show_comment: false
              ,focus: false
            });
            loadFirstPage(that);
          }
          utils.hideLoading();
        });
      })
  }

  ,openLocation: function(){
      wx.openLocation({
        latitude: gourmet.location.latitude,
        longitude: gourmet.location.longitude,
        scale: 28
      })
  }

  ,onLoadMore: function(){
    if(mLoading) return;
    if(!mIsmore) return;
    var that = this;
    getComments(mPage + 1, function(comments){
          if(comments && comments.length > 0){
            mPage++;
            mComments = mComments.concat(comments);
            if(comments.length > 0){
                that.setData({
                  comments: mComments
                });
            }
          }else{
            mIsmore = false;
            that.setData({
               hide_loadmore: true
            })
          }
      })
  }

  ,onShareAppMessage: function () {
    return {
      title: gourmet.title,
      desc: gourmet.description,
      path: '/pages/detail/detail?item='+JSON.stringify(gourmet)
      //path: '/pages/detail/detail?id='+gourmet.objectId
    }
  }

  ,onReachBottom: function() {
    // Do something when page reach bottom.
    console.log('bottom');
    this.onLoadMore();
  }
  //组织事件冒泡
  ,stopScroll: function(){
    console.log('stopScoll')
  }
  //open comment layour
  ,openComment: function(){
    this.setData({
      show_comment: true
      ,focus: true
    })
  }
  //close comment layout
  ,closeComment: function(){
    this.setData({
      show_comment: false
      ,focus: false
    })
  }
  //addSupport
  ,addSupport: function(){
    var that = this;
    if(!mIsSupportOk) return;
    if(!that.data.gourmet) return;
    API.addEvaluation(that.data.gourmet.objectId, true);
    var newNumber = that.data.gourmet.support + 1;
    that.data.gourmet.support = newNumber;
    that.setData({
      gourmet: that.data.gourmet
    })
    toggleSupport(that,true)
    mIsSupportOk = false;

  }
  //addUnsupport
  ,addUnsupport: function(){
    var that = this;
    if(!mIsSupportOk) return;
    if(!that.data.gourmet) return;
    API.addEvaluation(that.data.gourmet.objectId, false);
    var newNumber = that.data.gourmet.objection + 1;
    that.data.gourmet.objection = newNumber;
    that.setData({
      gourmet: that.data.gourmet
    })
    toggleSupport(that,false)
    mIsSupportOk = false;

  }
})


//添加评论-到新的表
function addComment(gourmet_id, userinfo, content, cb){
    //创建类和实例
    var Comment = Bmob.Object.extend("comment");
    var comment = new Comment();
    comment.set("gourmet_id", gourmet_id);
    comment.set("openid", userinfo.openid);
    comment.set("avatar", userinfo.avatarUrl);
    comment.set("nickname", userinfo.nickName);
    comment.set("content", content);
    comment.set("create_time",utils.getNowTimestamp());
    comment.set("create_time_tag", utils.timestamp2date(utils.getNowTimestamp() * 1000));
    //添加数据，第一个入口参数是null
    comment.save(null, {
        success: function(result) {
            console.log("创建新表评论成功, objectId:"+result.id);
            cb(true, result);
        },
        error: function(result, error) {
          // 添加失败
          console.log('创建新表评论失败');
          cb(false);
        }
    });
}

function loadFirstPage(that){
  mPage = 1;
  getComments(mPage, function(comments){
      mComments = comments;
      if(comments.length > 0){
          mIsmore = true;
          that.setData({
            comments: mComments
            ,hide_loadmore: false
          })
      }
  })
}