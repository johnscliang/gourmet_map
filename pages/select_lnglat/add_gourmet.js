var Bmob = require('../../utils/bmob.js');

var urls = [];

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
      alert("最多添加9张图片")
      return;
    }
    var that = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log('tempFilePaths', tempFilePaths);
          //
          var count = 0;
          var beishu = 100/tempFilePaths.length;
          if (tempFilePaths.length > 0) {

              // var name="1.jpg";//上传的图片的别名
              // var file=new Bmob.File(name,tempFilePaths);
              // file.save().then(function(res){
              //   console.log('upload res',res);
              // },function(error){
              //   console.log(error);
              // })
            
            for(var i = 0; i< tempFilePaths.length; i++){
                var name = i+".jpg";//上传的图片的别名
                var file = new Bmob.File(name, [tempFilePaths[i]]);
                console.log(name,tempFilePaths[i])
                file.save().then(function (res) {
                  console.log('upload',res.url());
                  urls.push(res.url());
                  count++;
                  updatePrgress(count, beishu);
                }, function (error) {
                  console.log('upload',error);
                  count++;
                  updatePrgress(count, beishu);
                })
            }

          }

          function updatePrgress(count, beishu){
              that.setData({
                pics_number: count
                ,upload_progress: (count+1) * beishu
                ,urls: urls
              })
          }
        }
      })
  }
}