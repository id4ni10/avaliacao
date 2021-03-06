var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    /*$routeProvider
        .when('/', {
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
        });*/

    /*$routeProvider
        .when('/', {
            controller: 'categoriasController',
            templateUrl: 'view/categorias/list.html'
        }).when('/edit/:id', {
            controller: 'categoriasController',
            templateUrl: 'view/categorias/form.html'
        }).when('/new', {
            controller: 'categoriasController',
            templateUrl: 'view/categorias/form.html'
        }).otherwise({
            redirectTo: '/'
        });*/

    $routeProvider
        .when('/', {
            controller: 'pedidosController',
            templateUrl: 'view/pedidos/list.html'
        }).when('/edit/:id', {
            controller: 'pedidosController',
            templateUrl: 'view/pedidos/form.html'
        }).when('/new', {
            controller: 'pedidosController',
            templateUrl: 'view/pedidos/form.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);

app.run(['$rootScope', function ($rootScope) {
    //$rootScope.info = "CRUD de Peça";
    //$rootScope.info = "CRUD de Categoria";
    $rootScope.info = "CRUD de Pedido";
    console.log('app.run');
}]);
