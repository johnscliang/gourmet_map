var app = getApp();
var Bmob = require('bmob.js');
var utils = require('util.js');

module.exports = {
    //
    addLocationPoint: function(){
     app.getLocationInfo((localtionInfo)=>{
        console.log('addLocationPoint',localtionInfo);
        app.getUserInfo((userinfo)=>{
        console.log('addLocationPoint',userinfo);
        //add an analysis point
        var ActivePoint = Bmob.Object.extend('active_point');
        var activePoint = new ActivePoint();
        activePoint.set('longitude',localtionInfo.longitude);
        activePoint.set('latitude',localtionInfo.latitude);
        activePoint.set('create_time', utils.getNowTimestamp());
        //
        activePoint.set('openid', userinfo.openid);
        activePoint.set('city', userinfo.city);
        activePoint.set('province', userinfo.province);
        activePoint.set('gender', userinfo.gender);
        
        activePoint.save(null, {
            success: function(result){

            }
            ,error: function(result, error){

            }
        })
        
      })
     }) 
    }


}