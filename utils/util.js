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
  , showLoading: function (loading) {
    this.getCurrentPage().setData({
      show_loading: loading
    })
  }
  , showSuccess: function (title) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000
    })
  }
  , showModal: function (title, content, cb) {
    wx.showModal({
      title: title,
      content: content == undefined ? '' : content,
      showCancel: false,
      success: function (res) {
        if (cb) {
          cb(res)
        }
      }
    })
  }
  //  获取当前页面
  ,getCurrentPage:function(){
    var arr = getCurrentPages();
    return arr[arr.length - 1]
  }















  /**获取今天零点的时间戳*/
  , getToday: function () {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return Math.floor(today.getTime() / 1000);
  },
  /**获取这个月的第一天时间戳*/
  getThisMonth: function () {
    var today = new Date();
    today.setDate(0);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return Math.floor(today.getTime() / 1000);
  },
  /**获取实时时间戳*/
  getNowTimestamp: function () {
    return Math.floor(new Date().getTime() / 1000);
  },
  /**时间戳转日期格式*/
  timestamp2date: function format(timestamp) {
    function add0(m) { return m < 10 ? '0' + m : m }
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
  }
  //获取当前分钟数的时间戳
  , getNowMinute: function () {
    var today = new Date();
    today.setSeconds(0);
    today.setMilliseconds(0);
    return Math.floor(today.getTime() / 1000);
  }
  //获取当前小时数
  , getNowHour: function () {
    var today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    return Math.floor(today.getTime() / 1000);
  }
  , getNowMinuteByTimestamp: function (timestamp) {
    var today = new Date(timestamp * 1000);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return Math.floor(today.getTime() / 1000);
  }
  // 文件名
  , getFileName: function () {
    var timestamp = this.getNowTimestamp();
    function add0(m) { return m < 10 ? '0' + m : m }
    var time = new Date(timestamp * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '' + add0(m) + '' + add0(d) + '' + add0(h) + '' + add0(mm) + '' + add0(s);
  }
  , getNowTimeTag: function () {
    var timestamp = this.getNowTimestamp();
    function add0(m) { return m < 10 ? '0' + m : m }
    var time = new Date(timestamp * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '年' + add0(m) + '月' + add0(d) + '日';
  }
  //友好时间
  ,dateStr: function(date){
    //获取js 时间戳
    var time=new Date().getTime();
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time=parseInt((time-date*1000)/1000);

    //存储转换值 
    var s;
    if(time<60*10){//十分钟内
        return '刚刚';
    }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
    }else if((time<60*60*24)&&(time>=60*60)){ 
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
    }else if((time<60*60*24*3)&&(time>=60*60*24)){ 
        //超过1天少于3天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
    }else{ 
        //超过3天
        var date= new Date(parseInt(date) * 1000);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }
}
   
}