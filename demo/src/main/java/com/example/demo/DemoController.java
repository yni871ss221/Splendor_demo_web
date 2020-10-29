package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import jp.example.service.DemoService;

@Controller
@EnableAutoConfiguration
public class DemoController {

	@Autowired
	private DemoService demoService;

	/**
	 * サンプル
	 */
	@RequestMapping(value = "getDemoController", method = RequestMethod.GET)
	@ResponseBody
	public String[] getDemoController(@RequestParam("sampleValue") String sampleValue) {

		String returnValue = demoService.getDemoService(sampleValue);
		String[] returnValues = { returnValue };
		return returnValues;
	}

	/**
	 * 入室プレイヤーを登録する
	 * 
	 * @param name 入力したニックネーム
	 */
	@RequestMapping(value = "registerEntryPlayer", method = RequestMethod.POST)
	@ResponseBody
	public String[] registerEntryPlayer(@RequestParam("name") String name) {

		String returnValue = demoService.registerEntryPlayer(name);
		String[] returnValues = { returnValue };
		return returnValues;
	}

	/**
	 * チャットメッセージ送信
	 * REST（/send_chat/{roomName}）でメッセージを受け取り、WebSocket（/topic/receiveMessage）で1対多送信する
	 * @param roomName 部屋名
	 * @param message メッセージフォーム
	 * @return メッセージフォーム（/topic:1対多送信）
	 * @throws Exception
	 */
    @MessageMapping("/send_chat/{roomName}")
	@SendTo("/topic/receiveMessage")
    public ChatMessageForm sendChatMessage(
    		@DestinationVariable("roomName") String roomName,
    		@Payload ChatMessageForm message) throws Exception {

    	// メッセージ内容を返信用フォームに格納して返信
        return message;
    }
    
	/**
	 * 着席/離席
	 * @param player
	 * @return
	 * @throws Exception
	 */
	@MessageMapping("/sitLeaveTable")
	@SendTo("/topic/receivePlayerInfo")
	public GamePlayerForm sitLeaveTable(
			@Payload GamePlayerForm player) throws Exception {

//		demoService.playerReadyLogic(player);
		
		return player;
    }
}
