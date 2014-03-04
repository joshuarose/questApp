/**
 * Created by joshuarose on 3/4/14.
 */
questApp.factory('smsService', function ($http, $q) {
  var factory = {};
  var smsUrl = "https://MAMDHJODA3MWQXYMQ5OD:Mzg5OWFmMGNmYzhmYjAyODU0ODJlNjIzNWZiNTYz@api.plivo.com/v1/Account/MAMDHJODA3MWQXYMQ5OD/Message/";

  factory.sendSMS = function (destination, message) {
    var data = {
      "src" : "18722050601",
      "dst" : "1" + destination,
      "text" : message
    };
    $http.post(smsUrl, data).success(function () {
      //I guess we could do something here
    });
  };

  return factory;
});