var app = getApp();
var getDistance = require('../utils/distance.js').getDistance;
var Bmob = require('../utils/bmob.js');


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
          query.withinKilometers("location", point, 3000);
          // 每页个数
          query.limit(pagesize);
          // 每页个数
          query.skip(pagesize * (page - 1))
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
}