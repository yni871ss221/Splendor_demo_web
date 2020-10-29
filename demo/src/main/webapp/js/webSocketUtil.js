/**
 * WebSocketのクライアントを作成する
 */
function connectWebSocket($rootScope, url) {
	// WebSocketの設定
	// SockJSにより、エンドポイントのURL設定
	var socket = new SockJS(url);
	// WebSocketを使ったStompクライアントを作成
	var stompClient = Stomp.over(socket);

	// エンドポイントに接続し、接続した際のコールバックを登録
//	stompClient.connect({}, onConnect($rootScope), onError($rootScope));
	// TODO なぜかonConectとonErrorの両方が呼ばれるので、onErrorは呼ばないようにする
	stompClient.connect({}, onConnect($rootScope));
	// 接続したstompClientをrootScopeに設定
	$rootScope.stompClient = stompClient;
	
}

/**
 * エンドポイント接続に成功した場合の処理
 */
function onConnect($rootScope) {
	
	// 接続済みフラグを設定
	$rootScope.isConnectWebSocket = true;
}

/**
 * エンドポイント接続に失敗した場合の処理
 */
function onError($rootScope) {
	
	showAlert("Could not connect to WebSocket server. Try after refresh this page.");
	
	// 接続済みフラグを設定
	$rootScope.isConnectWebSocket = false;
}