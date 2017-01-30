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
}
