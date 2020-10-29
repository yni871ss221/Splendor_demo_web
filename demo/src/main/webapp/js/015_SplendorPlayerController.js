/**
 * Splendorプレイヤー部コントローラー
 * @param $scope
 * @param $window
 * @returns
 */
app.controller("015_SplendorPlayerController", function($scope, $rootScope, $window) {


	/**
	 * 「席に着く」ボタン押下時イベント
	 */
	$scope.sitTable = () => {

		// 着席判定フラグをtrueに変更
		$rootScope.player.game_start_flg = true;

		// WebSocket接続済みの場合、着席APIを呼び出す
		if($rootScope.isConnectWebSocket){
			
			// API呼び出しパラメータ作成
			let gamePlayer = {
				name : $rootScope.player.username,
				avatar_url : $rootScope.player.avatar_url,
				mode : 'SIT_TABLE'
			};
			
			// 着席API呼び出し
			$rootScope.stompClient.send("/app/sitLeaveTable", {}, JSON.stringify(gamePlayer));
		}
	};

	/**
	 * 「席を離れる」ボタン押下時イベント
	 */
	$scope.leaveTable = () => {

		// 席を離れたのでプレイヤーの情報を更新
		$rootScope.player.game_start_flg = false;

		if($rootScope.stompClient){
			let gamePlayer = {
				name : $rootScope.player.username,
				avatar_url : $rootScope.player.avatar_url,
				mode : 'LEAVE_TABLE'
			};
			$rootScope.stompClient.send("/app/sitLeaveTable", {}, JSON.stringify(gamePlayer));
		}
	};

	/**
	 * 「ゲーム開始」ボタン押下時イベント
	 */
	$scope.gameStart = () => {
		
		// 一番最初に着席しているプレイヤーのターンフラグを更新
		$scope.gamePlayers[0].value.turnFlg = true;
		$('#gamePlayer_info_' + $scope.gamePlayers[0].value.name).addClass('my_turn');

		if(stompClient){

			let player = {
				"userid": "user_id",
				"turnPlayerName": $scope.gamePlayers[0].value.name
			}
			stompClient.send("/app/game_start", {}, JSON.stringify(player));
		}
	};
})

