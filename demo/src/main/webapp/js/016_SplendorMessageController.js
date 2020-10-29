/**
 * Splendorメッセージ部コントローラー
 * @param $scope
 * @param $window
 * @returns
 */
app.controller("016_SplendorMessageController", function($scope, $rootScope, $window, $sanitize) {

	// TODO チャット部屋1だけしか使用していないが、複数部屋にした際に切り替える
	$scope.roomNames = ['チャット部屋1', 'チャット部屋2', 'チャット部屋3'];
	$scope.roomName = $scope.roomNames[0];
	
	/**
	 * 送るボタン押下時イベント
	 */
	$scope.sendMessage = () => {
		// メッセージ内容をトリムする
		var message = $scope.message.trim();
		// メッセージが空ではない、かつWebsocket接続済みの場合
		if(message && $rootScope.isConnectWebSocket) {
			
			// メッセージオブジェクトを作成
			let chatMessage = {
				sender: $rootScope.player.name,
				content: $sanitize(message),
				type: 'CHAT',
				timestamp: new Date()
			};

			// メッセージをWebSocket向けに送信する
			$rootScope.stompClient.send("/app/send_chat/" + $scope.roomName, {}, JSON.stringify(chatMessage));
			
			// メッセージボックスを空に戻す
			$scope.message = "";
		}
	};
})

