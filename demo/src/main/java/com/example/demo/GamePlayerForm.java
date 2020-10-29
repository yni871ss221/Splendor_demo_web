package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 * Splendor内プレイヤー情報
 * 
 */
@Data
public class GamePlayerForm {

	private String userid = "";
	private String name = "";
	private String mode = "";
	private String avatar_url = "";
	private Boolean game_start_flg = true;
	private int score = 0;
//	private DevCardJewel devCard = new DevCardJewel();
//	private Token token = new Token();
	private List<Integer> nobleTiles = new ArrayList<Integer>();
	private Boolean turnFlg = false;
}
