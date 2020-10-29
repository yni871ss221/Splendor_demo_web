/**
 * Splendor画面コントローラー
 * @param $scope
 * @param $window
 * @returns
 */
app.controller("011_SplendorController", function($scope, $rootScope, $window) {
	
	// 入室中のプレイヤー情報リスト
	$scope.gamePlayers = [];
	//
	$scope.gameplayerOrder = [];
	// チャットメッセージ
	$scope.chatMessages = [];
	
	/**
	 * 画面表示時イベント
	 */
	$scope.init = function () {
		
		$scope.my_player_info.username = $scope.my_player_info.username.trim();
		
		// WebScoketのコネクションが作成済みの場合
		if ($rootScope.isConnectWebSocket) {
			// WebScoketのコールバックを登録する
			webSocketCallback();
		}
	}
	
	/**
	 * WebSocketに接続中に自動応答するコールバック処理を登録
	 */
	function webSocketCallback() {
			
		// エラー（/user/queue/errors）受信時のコールバック登録
		$rootScope.stompClient.subscribe('/user/queue/errors', (error) => {
			// エラーメッセージを表示
			onError(JSON.parse(error.body).message);
		});
		
		// チャットメッセージ（/topic/receiveMessage）受信時のコールバック登録
		$rootScope.stompClient.subscribe('/topic/receiveMessage', receiveMessageCallback);
		
		// ゲームプレイヤー情報（/topic/gamePlayerInfo）受信時のコールバック登録
		$rootScope.stompClient.subscribe('/topic/receivePlayerInfo', receivePlayerInfoCallback);

		// 退席プレイヤー（/topic/gamePlayerInfo）受信時のコールバック登録
//		$rootScope.stompClient.subscribe('/topic/leaveUserInfo', receiveLeavePlayer);
//		// ゲーム開始ボタンが押下されサーバーから返却された際に呼び出されるメソッド
//		$rootScope.stompClient.subscribe('/topic/setGameField', setGameField);
//		// 宛先/app/greetへJsonに格納してメッセージを送信
//		$rootScope.stompClient.send("/app/adduser", {}, JSON.stringify({sender: $scope.my_player_info.username, type: 'JOIN', timestamp: new Date()}));
		
	}
	
	/**
	 * チャットメッセージ受信時のコールバック処理
	 * @param {} receiveMessageJson 
	 */
	function receiveMessageCallback(receiveMessageJson) {

		// 受け取り値をJSONへパース
		var receiveMessage = JSON.parse(receiveMessageJson.body);
		
		// これまで追加されたメッセージへ追加格納
		$scope.chatMessages.push(receiveMessage);

		// データバインドを更新
		$scope.$apply();
		// チャットメッセージ領域の高さを調節
		var conversationArea = document.querySelector('#conversation');
		conversationArea.scrollTop = conversationArea.scrollHeight;
	}
	
	/**
	 * 席につく・離席ボタンがクリックされた際の処理
	 * @param {*} receiveGamePlayerJson 
	 */
	function receivePlayerInfoCallback(receiveGamePlayerJson) {

		// 受け取り値をJsonへパース
		var receiveGamePlayer = JSON.parse(receiveGamePlayerJson.body);
		
		if(gamePlayer.mode === 'SIT_TABLE'){
			var player = new Player();
			var dict = new Object();

			player.name = receiveGamePlayer.name;
			player.userid = receiveGamePlayer.userid;
			player.avatar_url = receiveGamePlayer.avatar_url;

    		dict["no"] = $scope.gamePlayers.length + 1;
    		dict["id"] = gamePlayer.name;
			dict["value"] = player;

			$scope.gamePlayers.push(dict);

		} else if(gamePlayer.mode === 'LEAVE_TABLE') {

			// 該当するプレイヤーを削除
			$scope.gamePlayers.some(function(v, i) {
				if (v.value.name == gamePlayer.name) {
					$scope.gamePlayers.splice(i,1);
				}
			});
		}

		// ゲーム人数が2人以上であればゲーム開始ボタンを押せるようにする(席についているプレイヤーのみ)
		if($scope.my_player_info.game_start_flg && $scope.gamePlayers.length >= 2){
			$scope.gameStartButtonSwitch = true;
		} else{
			$scope.gameStartButtonSwitch = false;
		}

		// データバインドを更新
		$scope.$apply();
	}
})

