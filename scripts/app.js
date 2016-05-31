var angularApp = angular.module('footballApp', ['ngResource','ngRoute']);

angularApp.config(function ($routeProvider) {
  $routeProvider
  .when ('/', {
    templateUrl: 'pages/landing.html',
    controller: 'HomeController',
    controllerAs: 'vh'
  })
});
//   .when ('/matchdetails/:uniqId', {
//     templateUrl: 'templates/details.html',
//     controller: 'DetailsController',
//     controllerAs: 'dc'
//   })
// });


angularApp.controller("HomeController",['$resource','$filter', '$http',function($resource,$filter,$http){
  var vm=this;
    // var footballResource = $resource('http://api.football-data.org/v1/soccerseasons/');
    // vm.footballResponse = footballResource.get();
      var config = {headers:  {
        'X-Auth-Token': 'e03b9e6e71734ae38c076a13eac738ea'
      }
    };

    var data = $http.get("http://api.football-data.org/v1/soccerseasons/", config);
    console.log(data);


}]);


// angularApp.controller("DetailsController",['$resource','$filter','$routeParams',
// function($resource,$filter,$routeParams){
//     var vm=this;
//     var id = $routeParams.uniqId;
//     var cricDetails = $resource('http://cricapi.com/api/cricketScore',{unique_id:id});
//     vm.cricResponse = cricDetails.get();
//
//
// }]);
