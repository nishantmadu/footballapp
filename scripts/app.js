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


.when ('/teamdetails/:uniqId', {
  templateUrl: 'pages/teams.html',
  controller: 'TeamsController',
  controllerAs: 'tc'
})
//
});



angularApp.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.headers.common['X-Auth-Token'] = 'af86c338f9014ef3bae9c0d3e246961a';
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


angularApp.controller("DetailsController",['$filter','$routeParams','FootballService',function($filter,$routeParams,FootballService){
    var vm=this;

    var id = $routeParams.uniqId;
    vm.detailsResponse = FootballService.getTeams(id);
    vm.pointsResponse = FootballService.getPoints(id);

    console.log(vm.detailsResponse);
    console.log(vm.pointsResponse);

  }]);


    angularApp.controller("TeamsController",['$resource','$filter','$routeParams',function($resource,$filter,$routeParams){
      var id = $routeParams.uniqId;
      vm.teamsResponse = FootballService.getTeamdetails(id);



}]);




angularApp.service('FootballService', function($resource) {
  var vm =this;
    vm.getTeams = function (id) {
      var footballDetails = $resource('http://api.football-data.org/v1/soccerseasons/' + id + '/teams');
      vm.detailsResponse = footballDetails.get();
      return vm.detailsResponse;
    }

    vm.getPoints = function(id) {
      var footballDetails = $resource('http://api.football-data.org/v1/soccerseasons/' + id + '/leagueTable');
      vm.pointsResponse = footballDetails.get();
      return vm.pointsResponse;
    }

    vm.getTeamdetails = function(id) {
      var teamDetails = $resource();
      vm.teamsResponse = footballDetails.get();
      return vm.teamsResponse;
    }

});
