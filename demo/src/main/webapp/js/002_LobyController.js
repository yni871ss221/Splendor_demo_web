/**
 * ロビー画面コントローラー
 * @param $scope
 * @param $window
 * @returns
 */
app.controller("002_LobyController", function($scope, $rootScope, $window) {

	// 各ページ用のWebsocketコネクション確立
	// Splendor用WebSocketコネクション
	connectWebSocket($rootScope, '/demo/splendor1-websocket');

	/**
	 * Splendor1ボタン押下時イベント
	 */
	$scope.entry_splendor1 = function(e) {
		
		// 画面遷移
		$window.location.href = '/demo/#/011_Splendor1';
	}
	
})

