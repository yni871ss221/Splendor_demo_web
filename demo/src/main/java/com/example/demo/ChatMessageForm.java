package com.example.demo;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class ChatMessageForm {

	// チャットメッセージタイプ（CHAT, JOIN, LEAVE）
	private MessageType type;
	// チャットメッセージ内容
	private String content;
	// チャットメッセージ送信者
	private String sender;
	// チャットメッセージ送信日時
	private Date timestamp;
	// チャット部屋名
	private String roomName;
	// ↓これ必要？
	private Map<String, String> loginUserMap;
	
	public ChatMessageForm(MessageType type, String content, String sender, String roomName) {
		this.type = type;
		this.content = content;
		this.sender = sender;
		this.roomName = roomName;
		this.timestamp = new Date();
		
		loginUserMap = new HashMap<String, String>();
		loginUserMap.put("type", type.toString());
		loginUserMap.put("content", content);
		loginUserMap.put("sender", sender);
		loginUserMap.put("topic", roomName);
		loginUserMap.put("timestamp", new Date().toString());
	}
}
