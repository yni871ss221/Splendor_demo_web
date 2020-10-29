/**
 * [GET]Ajaxリクエスト送信部品
 */
function sendGetAjaxRequest(path, sendJsonParam) {
	$.ajax({
		type : "GET",
		url : path,
		data : sendJsonParam,
		dataType : "json",
		success : onAjaxSuccess,
		error : onAjaxError
	});
}

/**
 * [POST]Ajaxリクエスト送信部品
 */
function sendPostAjaxRequest(path, sendJsonParam) {
	$.ajax({
		type : "POST",
		url : path,
		data : sendJsonParam,
		dataType : "json",
		success : onAjaxSuccess,
		error : onAjaxError
	});
}
/**
 * Ajax通信に成功した場合の処理
 */
function onAjaxSuccess(data) {
	alert("success");
}

/**
 * Ajax通信に失敗した場合の処理
 */
function onAjaxError(XMLHttpRequest, textStatus, errorThrown) {
	alert("error");
}