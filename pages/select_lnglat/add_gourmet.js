var app = getApp();
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');
var CS = require('../../utils/CS.js');

var gourmet_title = "";
var gourmet_desc = "";
var urls = [];
var headurl = "";//
var headurlIndex = 0;
var geopoint = null;

function clearData(){
   gourmet_title = "";
   gourmet_desc = "";
   urls = [];
   headurl = "";//
   headurlIndex = 0;
   geopoint = null;
}

module.exports = {
  editPos: function(){
      console.log('editPos');
      this.getLngLat(value=>{
        geopoint = value;
        //
        this.setData({
          "hide": true
          ,"show": true
        })
      });   
  }
  //add pictures
  ,add_pics:function(){
    if(urls.length == 9){
      utils.showModal('错误','最多添加9张图片')
      return;
    }
    var that = this;
      wx.chooseImage({
        count: 9 - urls.length, // 默认9
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log('tempFilePaths', tempFilePaths);
          //
          if (tempFilePaths.length > 0) {

              // var name="1.jpg";//上传的图片的别名
              // var file=new Bmob.File(name,tempFilePaths);
              // file.save().then(function(res){
              //   console.log('upload res',res);
              // },function(error){
              //   console.log(error);
              // })
            for(var i = 0; i< tempFilePaths.length; i++){
                utils.showLoading("上传中");
                console.log("uploading...")
                var name = i+".jpg";//上传的图片的别名
                var file = new Bmob.File(name, [tempFilePaths[i]]);
                console.log(name,tempFilePaths[i])
                file.save().then(function (res) {
                  console.log('upload',res.url());
                  urls.push(res.url());
                  updatePrgress();
                }, function (error) {
                  console.log('upload',error);
                  updatePrgress();
                })
            }

          }

          function updatePrgress(){
              headurl = urls.length > 0 ? urls[0] : "";
              that.setData({
                pics_number: urls.length
                ,urls: urls
                ,headurl: headurl
                ,show_headurl: headurl == "" ? false : true
              })
              setTimeout(function(){
                utils.hideLoading()
              },4000)
          }
        }
      })
  }

  //preview imgs
  ,preview: function(){
    if(urls.length == 0) return;
    wx.previewImage({
      current: urls[0], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }

  //切换首页图图
  ,checkout: function(){
    headurlIndex++;
    var index = headurlIndex % urls.length;
    headurl = urls[index];
    this.setData({
      headurl: headurl
    })
  }

  //
  ,confirmTitle: function(e){
      console.log(e.detail);
      gourmet_title = e.detail.value
  }
  ,confirmDesc: function(e){
      console.log(e.detail);
       gourmet_desc = e.detail.value
  }

  // 新增一个美食点
  ,add_gourmet: function(){
    
      console.log("新增美食点");
      console.log('geopoint',geopoint);
      console.log('urls',urls);
      console.log('headurl',headurl);
      console.log('gourmet_title',gourmet_title);
      console.log('gourmet_desc',gourmet_desc);
      // 检查参数
      if(urls.length == 0){
          return utils.showModal('错误','至少上传一张图片')
      }
      if(gourmet_title === ""){
          return utils.showModal('错误','请输入美食点名称')
      }

      app.getUserInfo(userinfo=>{
        // console.log(userinfo)
        var Gourmet = Bmob.Object.extend("gourmet");
        var gourmet = new Gourmet();
        gourmet.set("user_nickname", userinfo.nickName);
        gourmet.set("description", gourmet_desc);
        gourmet.set("head_url", headurl);
        // var location = geopoint.longitude+','+geopoint.latitude;
        var location = new Bmob.GeoPoint({latitude: geopoint.latitude, longitude: geopoint.longitude});
        gourmet.set("location", location);
        gourmet.set("openid", userinfo.openid);
        gourmet.set("urls", urls);
        gourmet.set("title", gourmet_title);
        gourmet.set("user_avatar", userinfo.avatarUrl);
        //添加数据，第一个入口参数是null
        gourmet.save(null, {
            success: function(result) {
                console.log("创建成功, objectId:"+result.id);
                utils.showSuccess("创建成功！");
                clearData();
                setTimeout(function(){
                  wx.navigateBack()
                },2000)
            },
            error: function(result, error) {
              // 添加失败
              console.log('创建失败',error);
            }
        });
      })

  }

}