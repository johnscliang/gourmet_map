
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
          that.setData({
            pics_number: tempFilePaths.length
            ,upload_progress: 80
          })
        }
      })
  }
}