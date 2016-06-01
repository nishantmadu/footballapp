var angularApp = angular.module('footballApp', ['ngResource','ngRoute']);

angularApp.config(function ($routeProvider) {
  $routeProvider
  .when ('/', {
    templateUrl: 'pages/landing.html',
    controller: 'HomeController',
    controllerAs: 'vh'
  })

  .when ('/leaguedetails/:uniqId', {
    templateUrl: 'pages/details.html',
    controller: 'DetailsController',
    controllerAs: 'dc'
  })
});

angularApp.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.headers.common['X-Auth-Token'] = 'e03b9e6e71734ae38c076a13eac738ea';
}]);


angularApp.controller("HomeController",['$resource','$filter', '$http','$q',function($resource,$filter,$http,$q){
  var vm=this;
    var footballResource = $resource('http://api.football-data.org/v1/soccerseasons/');
    vm.footballResponse = footballResource.query();
    console.log(vm.footballResponse);

    // $http.get("http://api.football-data.org/v1/soccerseasons/")
    //     .then(function(response){
    //       if (typeof response.data === 'object') {
    //                         vm.footballResponse = response.data;
    //                     } else {
    //                         return $q.reject(response.data);
    //                     }},
    //         function(response) {
    //           return $q.reject(response.data);
    //                     });






}]);


angularApp.controller("DetailsController",['$resource','$filter','$routeParams',
function($resource,$filter,$routeParams){
    var vm=this;

    var id = $routeParams.uniqId;
    var footballDetails = $resource('http://api.football-data.org/v1/soccerseasons/' + id + '/teams');
    vm.detailsResponse = footballDetails.get();
    console.log(vm.detailsResponse);


}]);
