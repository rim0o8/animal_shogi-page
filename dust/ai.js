function ai_order(){
	best_choice=ai_think(field.concat(),hand.concat())
	put(best_choice)
	if (best_choice.length==3){
		ai_html_summon(best_choice)
		ai_system_summon(best_choice)
	}
	else if (best_choice.length==4){
		ai_html_move(best_choice)
		ai_system_move(best_choice)
	}
}
function ai_html_move(choice){
	copy_src("piece"+String(choice[3])+String(choice[2]),"piece"+String(choice[1])+String(choice[0]))
	opacity("piece"+String(choice[3])+String(choice[2]),1)
	opacity("piece"+String(choice[1])+String(choice[0]),0)
}
function ai_system_move(choice){
	if (field[choice[3]][choice[2]] != 0){
		getPiece(field[choice[3]][choice[2]])
	}
	field[choice[3]][choice[2]] = field[choice[1]][choice[0]]
	field[choice[1]][choice[0]] = 0
}
function ai_html_summon(choice){
	change_src('piece'+String(choice[2])+String(choice[1]), src[choice[0]])
	if (hand[choice[0]] == 2){
		opacity(playerORai(num2piece(choice[0]))+num2piece(choice[0])+'2', 0)
	}
	else if (hand[choice[0]] == 1){
		opacity(playerORai(num2piece(choice[0]))+num2piece(choice[0])+'1', 0)
	}
	opacity('piece'+String(choice[2])+String(choice[1]), 1)
	toBright()
}
function num2piece(num){	//敵味方の判定なし
	if (num==1) return chick
	else if (num==2) return elephant
	else if (num==3) return giraffe
	else if (num==4) return lion
	else if (num==5) return chicken
	else if (num==6) return chick
	else if (num==7) return elephant
	else if (num==8) return giraffe
	else if (num==9) return lion
	else if (num==10) return chicken
}
function ai_system_summon(choice){
	hand[choice[0]]--
	field[choice[2]][choice[1]] = choice[0]
	return
}

function ai_think(v_field,v_hand){	//再帰
	orders = []
	choiceS = ai_check(v_field,v_hand)
	for(var i=0;i<choiceS.length;i++){
		put(choiceS)
		tmp = v_order(choiceS[i],v_field.concat(),v_hand.concat())
		orders.push(/*first_cal_choice_point(choiceS)+*/think(tmp[0].concat(),tmp[1].concat(),true,start_depth))
	}
	put(orders)
	best_index = 0;
	for(var i=1;i<orders.length;i++) if(orders[best_index]<orders[i]) best_index=i
	
	return choiceS[best_index]
}
function first_cal_choice_point(choice){
	if (choice.length == 4) point = get_piece_point(choice)
	else point = 0
	return point
}
function get_piece_point(choice){
	if (v_field[choice[2]][choice[3]] == 1) return 1
	else if (v_field[choice[2]][choice[3]] == 2) return 3
	else if (v_field[choice[2]][choice[3]] == 3) return 3
	else if (v_field[choice[2]][choice[3]] == 4) return 5
	else if (v_field[choice[2]][choice[3]] == 5) return 2
	else return 0
}
function think(v_field,v_hand,player_side,depth){
	//put('thinking')
	choices = check(v_field, v_hand, player_side)
	for (var i=0;i<choices.length;i++){
		if (choices[i].length == 4) point = get_piece_point(choices[i])
		else point = 0
		if (!player_side) point * -1

		if (point==5) return 5
		else if (point==-5) return -5
		if (depth==0) return point

		depth--
		tmp = v_order(choices[i],v_field.concat(),v_hand.concat())
		point += think(tmp[0].concat(),tmp[1].concat(),!player_side,depth)
	}
	return point /// choices.length
	function get_piece_point(choice){
		if (player_side){
			chick=1
			elephant=2
			giraffe=3
			lion=4
			chicken=5
		}
		else{
			chick=6
			elephant=7
			giraffe=8
			lion=9
			chicken=10
		}
		put(choice[3])
		put(choice[2])
		if (v_field[choice[3]][choice[2]] == chick) return 1
		else if (v_field[choice[3]][choice[2]] == elephant) return 3
		else if (v_field[choice[3]][choice[2]] == giraffe) return 3
		else if (v_field[choice[3]][choice[2]] == lion) return 5
		else if (v_field[choice[3]][choice[2]] == chicken) return 2
		else return 0
	}
}
function v_order(choice, v_field, v_hand){
	if (choice.length == 3) return v_summon(choice, v_field.concat(), v_hand.concat())	//choiceはhandのi番目の駒
	else if (choice.length == 4) return v_move(choice, v_field.concat(), v_hand.concat())
}
function v_move(choice, v_field, v_hand){
	if (v_field[choice[2]][choice[3]] != 0) v_hand[reverse(v_field[choice[2]][choice[3]])]++
	v_field[choice[2]][choice[3]] = v_field[choice[0]][choice[1]]
	v_field[choice[0]][choice[1]] = 0
	return [v_field.concat(),v_hand.concat()]
}
function v_summon(choice, v_field, v_hand){
	v_hand[choice[0]]--
	v_field[choice[1]][choice[2]] = choice[0]
	return [v_field.concat(),v_hand.concat()]
}
function check(v_field, v_hand, player_side){
	if (player_side==true) return player_check(v_field.concat(), v_hand.concat())
	else return ai_check(v_field.concat(), v_hand.concat())
}
function player_check(v_field, v_hand){
	choices = []
	free = []
	for(var x=1;x<=3;x++) for(var y=1;y<=4;y++) if(v_field[x][y] == 0) free.push([y,x])
	for(var i=1;i<=3;i++) if(hand[i] != 0) for(var j=0;j<free.length;j++) choices.push([i, free[j][0], free[j][1]])
	for (var x=1;x<=3;x++){	//盤面の手
		for (var y=1;y<=4;y++){
			if (v_field[y][x]==1){	//playerひよこ
				if (ally_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
			}
			else if (v_field[y][x]==2){	//playerぞう
				if (ally_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x+1])	//右前
				if (ally_CanV_move(x-1,y+1)) choices.push([y,x,y+1,x-1])	//左後
				if (ally_CanV_move(x+1,y+1)) choices.push([y,x,y+1,x+1])	//右後
			}
			else if (v_field[y][x]==3){	////playerキリン
				if (ally_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==4){	//playerライオン
				if (ally_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x+1])	//右前
				if (ally_CanV_move(x-1,y+1)) choices.push([y,x,y+1,x-1])	//左後
				if (ally_CanV_move(x+1,y+1)) choices.push([y,x,y+1,x+1])	//右後
				if (ally_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==5){	//playerニワトリ
				if (ally_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x+1,y)) choices.push([y,x,y+1,x])	//後
				if (ally_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x-1])	//右前
			}	
		}
	}
	return choices
}
function ai_check(v_field,v_hand){
	choices = []
	free = []
	for(var x=1;x<=3;x++) for(var y=1;y<=4;y++) if(v_field[x][y] == 0) free.push([y,x])
	for(var i=6;i<=8;i++) if(hand[i] != 0) for(var j=0;j<free.length;j++) choices.push([i, free[j][0], free[j][1]])
	for (var x=1;x<=3;x++){	//盤面の手
		for (var y=1;y<=4;y++){
			if (v_field[y][x]==6){	//aiひよこ
				if (enemy_CanV_move(x,y+1)) choices.push([y,x,y+1,x])	//前
			}
			else if (v_field[y][x]==7){	//aiぞう
				if (enemy_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (enemy_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x+1])	//右前
				if (enemy_CanV_move(x-1,y+1)) choices.push([y,x,y+1,x-1])	//左後
				if (enemy_CanV_move(x+1,y+1)) choices.push([y,x,y+1,x+1])	//右後
			}
			else if (v_field[y][x]==8){	//aiキリン
				if (enemy_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==9){	//aiライオン
				if (enemy_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (enemy_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x+1])	//右前
				if (enemy_CanV_move(x-1,y+1)) choices.push([y,x,y+1,x-1])	//左後
				if (enemy_CanV_move(x+1,y+1)) choices.push([y,x,y+1,x+1])	//右後
				if (enemy_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==10){	//aiニワトリ
				if (enemy_CanV_move(x,y-1)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1)) choices.push([y,x,y+1,x])	//後
				if (enemy_CanV_move(x-1,y-1)) choices.push([y,x,y-1,x-1])	//左前
				if (enemy_CanV_move(x+1,y-1)) choices.push([y,x,y-1,x+1])	//右前
			}
		}
	}
	return choices
}
function ally_CanV_move(x,y){
	if (0<x && x<=3){
		if (0<y && y<=4){
			if (!isAlly(field[y][x])){
				return true
			}
		}
	}
	return false
}
function enemy_CanV_move(x,y){
	if (0<x && x<=3){
		if (0<y && y<=4){
			if (!isEnemy(field[y][x])){
				return true
			}
		}
	}
	return false
}