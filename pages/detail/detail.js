var app = getApp();

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
        urls: gourmet.urls
        ,img_width: width
        ,img_height: width * 2/3
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
})