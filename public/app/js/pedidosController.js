app.controller('pedidosController', function ($scope, $http, $location, $routeParams) {

    $scope.loadAll = function () {
        $http.get("http://localhost:3000/api/pedidos").success(function (data) {
            $scope.pedidos = data;
            console.log($scope.pedidos);
        }).error(function (data) {
            alert("Error...");
            console.log(data);
        });
    }

    $scope.save = function () {
        if ($routeParams.id) {
            $scope.id = $routeParams.id;
            $http.put("http://localhost:3000/api/pedidos/" + $scope.id, $scope.pedido).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $http.post("http://localhost:3000/api/pedidos",
                $scope.pedido).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        }
    }

    $scope.del = function (id) {

        $http.delete("http://localhost:3000/api/pedidos/" + id).success(function (data) {
            $location.path('/');
        }).error(function (data) {
            alert("Error...");
        });
    }

    $scope.loadForm = function () {
        if ($routeParams.id) {
            $scope.title = "Editar Pedidos";
            $scope.id = $routeParams.id;
            $http.get("http://localhost:3000/api/pedidos/" + $scope.id).success(function (data) {
                $scope.pedido = data;
                $http.get("http://localhost:3000/api/categorias/").success(function (categorias) {
                    $scope.categorias = categorias;
                }).error(function (categorias) {
                    alert("Error...");
                });
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $scope.title = "Cadastrar Pedidos";
            $scope.pedido = {};
            $http.get("http://localhost:3000/api/categorias/").success(function (categorias) {
                $scope.categorias = categorias;
            }).error(function (categorias) {
                alert("Error...");
            });
        }
    }
});
