app.controller('categoriasController', function ($scope, $http, $location, $routeParams) {

    $scope.loadAll = function () {
        $http.get("http://localhost:3000/api/categorias").success(function (data) {
            $scope.categorias = data;
            console.log($scope.categorias);
        }).error(function (data) {
            alert("Error...");
            console.log(data);
        });
    }

    $scope.save = function () {
        if ($routeParams.id) {
            $scope.id = $routeParams.id;
            $http.put("http://localhost:3000/api/categorias/" + $scope.id, $scope.categoria).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $http.post("http://localhost:3000/api/categorias",
                $scope.categoria).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        }
    }

    $scope.del = function (id) {
        $http.delete("http://localhost:3000/api/categorias/" + id).success(function (data) {
            $location.path('/');
        }).error(function (data) {
            alert("Error...");
        });
    }

    $scope.loadForm = function () {
        if ($routeParams.id) {
            $scope.title = "Editar Categorias";
            $scope.id = $routeParams.id;
            $http.get("http://localhost:3000/api/categorias/" + $scope.id).success(function (data) {
                $scope.categoria = data;
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $scope.title = "Cadastrar Categorias";
            $scope.categoria = {};
            $http.get("http://localhost:3000/api/categorias/").success(function (categorias) {
                $scope.categorias = categorias;
            }).error(function (categorias) {
                alert("Error...");
            });
        }
    }
});
