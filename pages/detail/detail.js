var app = getApp();
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');

var gourmet = null;

Page({
  data: {
    urls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  }
  ,onLoad: function(option){
      var that = this;
      gourmet = app.globalData.gourmetsMap[option.id];
      console.log(gourmet.urls);
      app.getSystemInfo((width, height) => {
      that.setData({
        img_width: width
        ,img_height: width * 2/3
        ,gourmet: gourmet 
        })
    })

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
         textarea_content:e.detail.value
       })
  }

  ,addComment: function(e){
      var that = this;
      var commentStr = this.data.textarea_content;
      console.log(commentStr);
      if(commentStr == "" || commentStr == null){
          return utils.showModal('错误','请输入评论')
      }
      app.getUserInfo(userinfo=>{
        //
        utils.showLoading("loading")
        //
        var Gourmet = Bmob.Object.extend("gourmet");
        var query = new Bmob.Query(Gourmet);
        // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
        query.get(gourmet.objectId, {
            success: function(result) {
              console.log(gourmet.objectId,result)
              var oldcomments = result.get("comments") || [];
              console.log('oldcomments',oldcomments)
              var comment = {
                nickname: userinfo.nickName
                ,comment: commentStr
                ,avatar: userinfo.avatarUrl
                ,create_time: utils.getNowTimestamp()
              }
              oldcomments.unshift(comment);
              if(oldcomments.length > 300){
                  oldcomments.pop()
              }
              result.set('comments', oldcomments);
              result.save();
              that.setData({
                //新增成功之后，清空输入框
                textarea_content: ""
                //设置新的
                ,gourmet: result
              });
              utils.hideLoading();
              // The object was retrieved successfully.
            },
            error: function(object, error) {
                utils.hideLoading()
            }
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

  ,onShareAppMessage: function () {
    return {
      title: gourmet.title,
      desc: gourmet.description,
      path: '/pages/detail/detail?id='+gourmet.objectId
    }
  }
})