var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');

var urls = [];
var headurl = "";//
var headurlIndex = 0;

module.exports = {
  editPos: function(){
      console.log('editPos')
      this.setData({
        "hide": true
        ,"show": true
      })
  }
  //add pictures
  ,add_pics:function(){
    if(urls.length == 9){
      utils.showSuccess("最多添加9张图片")
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
                utils.showLoading("上传中···");
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

}