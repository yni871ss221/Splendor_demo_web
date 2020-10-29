/**
 * ログイン画面コントローラー
 * @param $scope
 * @param $window
 * @returns
 */
app.controller("001_LoginController", function($scope, $rootScope, $window) {
	
	// プレイヤーオブジェクトの作成
	$rootScope.player = new Player();
	
	/**
	 * 入場ボタン押下時イベント
	 */
	$scope.login = function(e) {
		
		// ニックネームをトリムする
		$rootScope.player.name = $scope.player.name.trim();
		
		// ==========================================
		// Ajax通信を送信する

		// 送信パラメータを設定
		var sendJsonParam = {
			"name" : $rootScope.player.name
		};
		
		// Ajax送信部品呼び出し
		sendPostAjaxRequest("registerEntryPlayer", sendJsonParam);
		// ==========================================


		// ロビー画面に遷移
		$window.location.href = "/demo/#/002_Loby";
	}
})

