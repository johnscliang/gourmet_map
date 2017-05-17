var app = getApp();
var getDistance = require('../utils/distance.js').getDistance;
var Bmob = require('../utils/bmob.js');
var utils = require('../utils/util.js');


module.exports = {
    //获取美食点接口
    getGourmetByPage: function(page, pagesize, cb){
      app.getLocationInfo(locationInfo=>{
        var Gourmet = Bmob.Object.extend("gourmet");
          var point = new Bmob.GeoPoint({
            latitude: locationInfo.latitude
            ,longitude: locationInfo.longitude
          });
          // 创建查询
          var query = new Bmob.Query(Gourmet);
          // location附近的位置
          //query.near("location", point);
          //query.withinGeoBox("location", southwestOfSF, northeastOfSF);
          query.withinKilometers("location", point, 30000);
          // 每页个数
          query.limit(pagesize);
          // 每页个数
          query.skip(pagesize * (page - 1))
          //隐藏的去掉
          query.notEqualTo("hide", true);
          // 查询
          query.find({
            success: function(gourmets) {
                var jsonArray = JSON.parse(JSON.stringify(gourmets));
                //distance
                for(var x in jsonArray){
                  jsonArray[x].distance = getDistance(locationInfo.latitude,locationInfo.longitude
                  ,jsonArray[x].location.latitude,jsonArray[x].location.longitude)
                }
                cb(jsonArray); 
            }
            ,error: function(error) {
              cb([])
              console.log('find error',error);
          }
          });

      })
    }

    //获取用户对应食物的顶踩信息
    ,getGourmetSupportInfo: function(gourmetID, cb){
      var Evaluation = Bmob.Object.extend("evaluation");
      app.getUserInfo((userinfo)=>{
          var query = new Bmob.Query(Evaluation);
          query.equalTo("openid_gourmetid", userinfo.openid + '-' + gourmetID);
          query.first({
            success: function(object) {
              // 查询成功
              if(object){
                cb(JSON.parse(JSON.stringify(object)))
              }else{
                cb(undefined)
              }
              
            },
            error: function(error) {
              cb(null)
            }
          });
      })
    }

    //add evaluation
    ,addEvaluation: function(gourmetID, support){
      var Evaluation = Bmob.Object.extend("evaluation");
      app.getUserInfo((userinfo)=>{
        var evaluation = new Evaluation();
        evaluation.set('openid_gourmetid', userinfo.openid + '-' + gourmetID);
        evaluation.set('has',true);
        evaluation.set('support', support);
        
        evaluation.save(null, {
            success: function(result){
              //修改gourmet的support
              var Gourmet = Bmob.Object.extend("gourmet");
              var query = new Bmob.Query(Gourmet);
              query.get(gourmetID, {
                success: function(result) {
                  if(support){
                    result.increment('support');
                  }else{
                    result.increment('objection');
                  }
                  result.save();
                },
                error: function(object, error) {

                }
            });
              
            }
            ,error: function(result, error){

            }
        })
      })
    }


















    //统计接口
    ,addLocationPoint: function(){
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
