var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'pecasController',
        templateUrl: 'view/pecas/list.html'
    }).when('/edit/:id', {
        controller: 'pecasController',
        templateUrl: 'view/pecas/form.html'
    }).when('/new', {
        controller: 'pecasController',
        templateUrl: 'view/pecas/form.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);
app.run(['$rootScope', function ($rootScope) {
    $rootScope.info = "CRUD de Peça"
    console.log('app.run');
}]);
