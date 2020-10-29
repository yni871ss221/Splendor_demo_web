var app = angular.module("app", [
	// 日付管理用
	'angularMoment',
	// サニタイズ
	'ngSanitize',
	// ルーティング
	'ngRoute',
	]);

/**
 * ルーティング設定
 */
app.config(function($routeProvider){
    $routeProvider
    	
    	// http://localhost:8080/demo/
        .when('/',{
            templateUrl : '001_Login.html',
            controller : '001_LoginRouteController'
        })
        // http://localhost:8080/demo/001_Login
        .when('/001_Login',{
            templateUrl : '001_Login.html',
            controller : '001_LoginRouteController'
        })
    	// http://localhost:8080/demo/002_loby
        .when('/002_Loby',{
            templateUrl : '002_Loby.html',
            controller : '002_LobyRouteController'
        })
    	// http://localhost:8080/demo/011_splendor1
        .when('/011_Splendor1',{
            templateUrl : '011_Splendor.html',
            controller : '011_SplendorRouteController'
        })
});

/**
 * 001_Login
 * ルーティング呼び出し時コントローラ
 * @param $scope
 * @returns
 */
app.controller('001_LoginRouteController', function($scope, $rootScope){
});
/**
 * 002_Loby
 * ルーティング呼び出し時コントローラ
 * @param $scope
 * @returns
 */
app.controller('002_LobyRouteController', function($scope){
});
/**
 * 011_Splendor
 * ルーティング呼び出し時コントローラ
 * @param $scope
 * @returns
 */
app.controller('011_SplendorRouteController', function($scope, $rootScope){
});
