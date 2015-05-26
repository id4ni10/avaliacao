app.controller('pecasController', function ($scope, $http, $location, $routeParams) {

    $scope.loadAll = function () {
        $http.get("http://localhost:3000/api/pecas").success(function (data) {
            $scope.pecas = data;
            console.log($scope.pecas);
        }).error(function (data) {
            alert("Error...");
            console.log(data);
        });
    }

    $scope.save = function () {
        if ($routeParams.id) {
            $scope.id = $routeParams.id;
            $http.put("http://localhost:3000/api/pecas/" + $scope.id, $scope.peca).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $http.post("http://localhost:3000/api/pecas",
                $scope.peca).success(function (data) {
                $location.path('/');
            }).error(function (data) {
                alert("Error...");
            });
        }
    }

    $scope.del = function(id) {

        $http.delete("http://localhost:3000/api/pecas/" + id).success(function (data) {
            $location.path('/');
        }).error(function (data) {
            alert("Error...");
        });
    }

    $scope.loadForm = function () {
        if ($routeParams.id) {
            $scope.title = "Editar Peças";
            $scope.id = $routeParams.id;
            $http.get("http://localhost:3000/api/pecas/" + $scope.id).success(function (data) {
                $scope.peca = data;
            }).error(function (data) {
                alert("Error...");
            });
        } else {
            $scope.title = "Cadastrar Peças";
            $scope.pessoa = {};
        }
    }
});
