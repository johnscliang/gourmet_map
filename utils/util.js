function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
  ,showLoading: function(title){
    wx.showToast({
      title: title == undefined ? "加载中" : title
      ,icon: 'loading'
    })
  }
  ,hideLoading: function(){
    wx.hideToast()
  }
  ,showSuccess: function(title){
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  }
  ,showModal: function(title,content,cb){
    wx.showModal({
      title: title,
      content: content == undefined ? '':content,
      showCancel: false,
      success: function(res) {
        if(cb){
            cb(res)
        }
      }
    })
  }















    /**获取今天零点的时间戳*/
    ,getToday:function(){
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime()/1000);
    },
    /**获取这个月的第一天时间戳*/
    getThisMonth:function(){
        var today = new Date();
        today.setDate(0);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime()/1000);
    },
    /**获取实时时间戳*/
    getNowTimestamp:function(){
        return Math.floor(new Date().getTime()/1000);
    },
    /**时间戳转日期格式*/
    timestamp2date:function format(timestamp){
        function add0(m){return m<10?'0'+m:m }
        var time = new Date(timestamp);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
    //获取当前分钟数的时间戳
    ,getNowMinute: function(){
        var today = new Date();
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime()/1000);
    }
    //获取当前小时数
    ,getNowHour: function(){
        var today = new Date();
        today.setMilliseconds(0);
        today.setSeconds(0);
        today.setMinutes(0);
        return Math.floor(today.getTime()/1000);
    }
    ,getNowMinuteByTimestamp: function(timestamp){
        var today = new Date(timestamp * 1000);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return Math.floor(today.getTime()/1000);
    }
    // 文件名
    ,getFileName: function(){
      var timestamp = this.getNowTimestamp();
      function add0(m){return m<10?'0'+m:m }
      var time = new Date(timestamp * 1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+''+add0(m)+''+add0(d)+''+add0(h)+''+add0(mm)+''+add0(s);
    }
}
