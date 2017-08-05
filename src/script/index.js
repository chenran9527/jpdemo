/**
 * 	@classDescription: 桌面控制js程序(基于angularjs)
 * 	@author: chenran
 * 	@version: 1.0
 *  @date: 2015-12-04
 * */


var max_window_num = 6;

/* 生成desktopApp，对于angularjs来说每个页面相当于一个app */
var app = angular.module('desktopApp', []);
/* 注册控制器，在控制器中做业务处理*/
app.controller('desktopCtrl', function($scope, $http) {

    /**
     * angularjs的http调用，类似于ajax，获取桌面功能木块的json数组
     */
//	    $http({ cache: false, url: "func/funclist", method: 'POST'})
    $http({ cache: false, url: "config/func.json", method: 'GET'})
        .then(
            function success(response) {
                $scope.funcs = response.data;
                //alert(data);
            },
            function error(response){
                console.info(response.toString());
            });

    /**
     * 打开操作窗口函数，点击左边功能导航，在右边操作页面打开窗口
     */
    $scope.clickNav = function(nav_index) {
        $scope.current = nav_index;
    };

    /**打开窗口的信息数组*/
    $scope.winArr = [];
    /**当前显示窗口的funcCode*/
    $scope.current = 0;

});