var Bmob = require('../../utils/bmob.js');

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
          var urls = [];
          if (tempFilePaths.length > 0) {
            for(var i = 0; i< tempFilePaths.length; i++){
                var name = i+".jpg";//上传的图片的别名
                var file = new Bmob.File(name, tempFilePaths[i]);
                console.log(name,tempFilePaths[i])
                file.save().then(function (res) {
                  console.log('upload',res.url());
                  urls.push(res.url());
                  count++;
                  updatePrgress(count);
                }, function (error) {
                  console.log('upload',error);
                  count++;
                  updatePrgress(count);
                })
            }
          }

          function updatePrgress(count){
              that.setData({
                pics_number: count
                ,upload_progress: (count+1) * 11.11111111
                ,urls: urls
              })
          }
        }
      })
  }
}