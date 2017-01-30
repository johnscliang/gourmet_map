var app = getApp();
var Bmob = require('../../utils/bmob.js');
var add_gourmet = require('./add_gourmet.js');
var CS = require('../../utils/CS.js');

var combinePage = {
    data:{
      map_width: 380
      ,map_height: 380
      ,urls:[]
    }
    //show current position
    ,onLoad: function(){
    var that = this;

    //set the width and height
    // 动态设置map的宽和高
    app.getSystemInfo((width, height) => {
      console.log('select_lnglat',width, height);
      that.setData({
           map_width: width
          ,map_height: width
          //设置预览小图的大小
          ,img_width: width/3 - 25
          ,img_height: width/3 -25
        })
    })
    
  }
}

//拓展
Object.extend(combinePage, add_gourmet);
//
Page(combinePage);