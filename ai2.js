function ai_order(){
	best_choice=ai_think(field.concat(),hand.concat())
	if (best_choice.length < 1) player_win()
	if (best_choice.length==3){
		ai_html_summon(best_choice)
		ai_system_summon(best_choice)
	}
	else if (best_choice.length==4){
		ai_html_move(best_choice)
		ai_system_move(best_choice)
	}
}
function win_ai_order(best_choice){
	if (best_choice.length < 1) player_win()
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
	put('~')
	put(choice)
	if (field[choice[2]][choice[3]] != 0){
		getPiece(field[choice[2]][choice[3]])
	}
	put(field[choice[2]][choice[3]])
	put(field[choice[0]][choice[1]])
	field[choice[2]][choice[3]] = field[choice[0]][choice[1]]
	field[choice[0]][choice[1]] = 0
}
function ai_html_summon(choice){
	change_src('piece'+String(choice[1])+String(choice[2]), src[choice[0]])
	if (hand[choice[0]] == 2){
		put('!')
		put(playerORai(num2piece(choice[0]))+num2piece(choice[0])+'2')
		opacity(playerORai(num2piece(choice[0]))+num2piece(choice[0])+'2', 0)
	}
	else if (hand[choice[0]] == 1){
		put('?')
		put(playerORai(choice[0])+num2piece(choice[0])+'2')
		opacity(playerORai(choice[0])+num2piece(choice[0])+'1', 0)
	}
	opacity('piece'+String(choice[1])+String(choice[2]), 1)
	toBright()
}
function ai_system_summon(choice){
	hand[choice[0]]--
	put('summon')
	put(choice)
	field[choice[2]][choice[1]] = choice[0]
	return
}
function num2piece(num){	//敵味方の判定なし
	if (num==1) return 'Chick'
	else if (num==2) return 'Elephant'
	else if (num==3) return 'Giraffe'
	else if (num==4) return 'Lion'
	else if (num==5) return 'Chicken'
	else if (num==6) return 'Chick'
	else if (num==7) return 'Elephant'
	else if (num==8) return 'Giraffe'
	else if (num==9) return 'Lion'
	else if (num==10) return 'Chicken'
}

//

function check(v_field, v_hand, player_side){	//y,xの順で返すので注意
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
				if (ally_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
			}
			else if (v_field[y][x]==2){	//playerぞう
				if (ally_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y-1,x+1])	//右前
				if (ally_CanV_move(x-1,y+1,v_field)) choices.push([y,x,y+1,x-1])	//左後
				if (ally_CanV_move(x+1,y+1,v_field)) choices.push([y,x,y+1,x+1])	//右後
			}
			else if (v_field[y][x]==3){	////playerキリン
				if (ally_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==4){	//playerライオン
				if (ally_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y-1,x+1])	//右前
				if (ally_CanV_move(x-1,y+1,v_field)) choices.push([y,x,y+1,x-1])	//左後
				if (ally_CanV_move(x+1,y+1,v_field)) choices.push([y,x,y+1,x+1])	//右後
				if (ally_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==5){	//playerニワトリ
				if (ally_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (ally_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (ally_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (ally_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
				if (ally_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y-1,x-1])	//左前
				if (ally_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y-1,x+1])	//右前
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
				if (enemy_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//前
			}
			else if (v_field[y][x]==7){	//aiぞう
				if (enemy_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y-1,x-1])	//左前
				if (enemy_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y-1,x+1])	//右前
				if (enemy_CanV_move(x-1,y+1,v_field)) choices.push([y,x,y+1,x-1])	//左後
				if (enemy_CanV_move(x+1,y+1,v_field)) choices.push([y,x,y+1,x+1])	//右後
			}
			else if (v_field[y][x]==8){	//aiキリン
				if (enemy_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==9){	//aiライオン
				if (enemy_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y-1,x-1])	//左前
				if (enemy_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y-1,x+1])	//右前
				if (enemy_CanV_move(x-1,y+1,v_field)) choices.push([y,x,y+1,x-1])	//左後
				if (enemy_CanV_move(x+1,y+1,v_field)) choices.push([y,x,y+1,x+1])	//右後
				if (enemy_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
			}
			else if (v_field[y][x]==10){	//aiニワトリ
				if (enemy_CanV_move(x,y-1,v_field)) choices.push([y,x,y-1,x])	//前
				if (enemy_CanV_move(x+1,y,v_field)) choices.push([y,x,y,x+1])	//右
				if (enemy_CanV_move(x-1,y,v_field)) choices.push([y,x,y,x-1])	//左
				if (enemy_CanV_move(x,y+1,v_field)) choices.push([y,x,y+1,x])	//後
				if (enemy_CanV_move(x-1,y-1,v_field)) choices.push([y,x,y+1,x+1])	//左前
				if (enemy_CanV_move(x+1,y-1,v_field)) choices.push([y,x,y+1,x-1])	//右前
			}
		}
	}
	return choices
}
function ally_CanV_move(x,y,v_field){
	var fie = clone_2dim(v_field)
	if (0<x && x<=3){
		if (0<y && y<=4){
			if (!isAlly(fie[y][x])){
				return true
			}
		}
	}
	return false
}
function enemy_CanV_move(x,y, v_field){
	var fie = clone_2dim(v_field)
	if (0<x && x<=3){
		if (0<y && y<=4){
			if (!isEnemy(fie[y][x])){
				return true
			}
		}
	}
	return false
}
function predict(command, v_field, v_hand){
	var pre_command = command.concat()
	var pre_field = clone_2dim(v_field)
	var pre_hand = v_hand.concat()

	if (pre_command.length==3){
		pre_hand[pre_command[0]]--
		pre_field[pre_command[2]][pre_command[1]] = pre_command[0]
	}
	if (pre_command.length==4){
		if (pre_field[pre_command[2]][pre_command[3]] != 0){
			pre_hand[getPieceForPredict(pre_field[pre_command[2]][pre_command[3]])]++
		}
		pre_field[pre_command[2]][pre_command[3]] = pre_field[pre_command[0]][pre_command[1]]
		pre_field[pre_command[0]][pre_command[1]] = 0
	}
	return [pre_field, pre_hand]
}
function getPieceForPredict(piece){
	if (piece == 6 || piece == 10) return 1
	else if (piece == 7) return 2
	else if (piece == 8) return 3
	else if (piece == 1 || piece == 5) return 6
	else if (piece == 2) return 7
	else if (piece == 3) return 8
}

function ai_get_win(commands, v_field, v_hand){	//読み専
	for (var i=0;i<commands.length;i++){
		if (commands[i].length == 4){
			if (v_field[commands[i][2]][commands[i][3]] == 4){
				return commands[i]
			}
		}
	}
	return 0
}
function player_get_win(commands, v_field, v_hand){	//読み専
	for (var i=0;i<commands.length;i++){
		if (commands[i].length == 4){
			if (v_field[commands[i][2]][commands[i][3]] == 9){
				return commands[i]
			}
		}
	}
	return 0
}
function isGet(command, v_field){
	if (command==[]) return false
	if (command.length==4){
		if (v_field[command[2]][command[3]] != 0) return true
	}
	return false
}
function get_not_lose(commands, v_field, v_hand){
	var commandS = commands.concat()
	var v_fielD = clone_2dim(v_field)
	var v_hanD = v_hand.concat()
	ret = []
	for (var i=0;i<commandS.length;i++){
		var tmp = predict(commandS[i],v_fielD,v_hanD)
		commands2 = player_check(tmp[0],tmp[1])
		put(commandS[i])
		put(tmp[0])
		put('com')
		put(commands2)
		if (player_get_win(commands2, tmp[0], tmp[1]) == 0) ret.push(commandS[i])
	}
	return ret
}
/*
function func1(func){
	commands = ai_check(v_field,v_hand)
	if (ai_get_win(commands,v_field,v_hand) != 0){
		win_ai_order(ai_get_win(commands,v_field,v_hand))
		player_lose()
	}
	commands = get_not_lose(commands,v_field,v_hand)
	if (commands == []) player_win()
	for (var j=0;j<commands.length;j++){
		if (isGet(commands[j],v_field)) point = 1
		else point = 0
		tmp = predict(commands[j],v_field,v_hand)
		v_field = tmp[0]
		v_hand = tmp[1]
		func(func1)
	}
}
function func2(func){
	commands = player_check(v_field,v_hand)
	for (var k=0;k<commands.length;k++){
		if (isGet(commands[j],v_field)) point -= 1
		tmp = predict(commands[j],v_field,v_hand)
		v_field = tmp[0]
		v_hand = tmp[1]
	}
}
*/

function ai_think(v_field,v_hand){
	put('field')
	put(field)
	var point = 0
	var biggest_points = []	//biggest
	commands = ai_check(v_field,v_hand)
	if (ai_get_win(commands,v_field,v_hand) != 0){
		win_ai_order(ai_get_win(commands,v_field,v_hand))
		player_lose()
	}
	put('get_not_lose')
	put(v_field)
	put(commands)
	commands = get_not_lose(commands,v_field,v_hand)
	put('!?')
	put(commands)
	biggest_commands = clone_2dim(commands)
	if (commands == []) player_win()
	for (var j=0;j<commands.length;j++){
		if (isGet(commands[j],v_field)){
			point = 1
			// put('commands[j]')
			// put(commands[j])
		} 
		else point = 0
		tmp = predict(commands[j],v_field,v_hand)
		// v_field = tmp[0]
		// v_hand = tmp[1]
		commands2 = player_check(tmp[0],tmp[1])
		big_points = []
		for (var k=0;k<commands2.length;k++){
			if (isGet(commands2[k],tmp[0])) {
				point2 = point - 1
				//put('commands2[k]')
				//put(commands2[k])
			}
			else{
				point2 = point
			}
			// put('com')
			// put(commands2[k])
			// put(tmp[0])
			tmp2 = predict(commands2[k],tmp[0],tmp[1])
			//put(tmp2[0])
			// v_field = tmp[0]
			// v_hand = tmp[1]
			commands3 = ai_check(tmp2[0],tmp2[1])
			//
			points = []
			if (ai_get_win(commands3,tmp2[0],tmp2[1]) != 0) points.push(/*'win'*/5)
			//else points.push('not_win')
			for (var l=0;l<commands3.length;l++){
				if (isGet(commands3[l],tmp2[0])) /*if(no_damage_atack(commands3[l],tmp2[0]))*/ {
					points.push(point2 + 1)
					// put('v_field')
					// put(tmp2[0])
					// put('commands3[l]')
					// put(commands3[l])
				}
				else points.push(point2)
			}
			big_points.push(max(points))
		}
		biggest_points.push(min(big_points))
	}
	put('???')
	put(biggest_points)
	put(biggest_commands)
	if (biggest_commands.length < 1) return []
	return biggest_commands[max_index(biggest_points)]
	//var best_index = 0
	//for (var i=1;i<biggest_points.length;i++) if (biggest_points[i] > biggest_points[best_index]) best_index = i
	//return biggest_commands[best_index]
}
function no_damage_atack(command,v_field){	//着手後その駒が取られない手,commandはmoveで確定
	if (v_field[command[3]-1][command[2]] != 6) return true
	if (v_field[command[3]+1][command[2]+1] != 7) return true
	if (v_field[command[3]+1][command[2]-1] != 7) return true
	if (v_field[command[3]-1][command[2]+1] != 7) return true
	if (v_field[command[3]-1][command[2]-1] != 7) return true
	if (v_field[command[3]+1][command[2]] != 8) return true
	if (v_field[command[3]+1][command[2]] != 8) return true
	if (v_field[command[3]][command[2]+1] != 8) return true
	if (v_field[command[3]][command[2]-1] != 8) return true
	if (v_field[command[3]+1][command[2]+1] != 9) return true
	if (v_field[command[3]+1][command[2]-1] != 9) return true
	if (v_field[command[3]-1][command[2]+1] != 9) return true
	if (v_field[command[3]-1][command[2]-1] != 9) return true
	if (v_field[command[3]+1][command[2]] != 9) return true
	if (v_field[command[3]+1][command[2]] != 9) return true
	if (v_field[command[3]][command[2]+1] != 9) return true
	if (v_field[command[3]][command[2]-1] != 9) return true
	if (v_field[command[3]-1][command[2]+1] != 10) return true
	if (v_field[command[3]-1][command[2]-1] != 10) return true
	if (v_field[command[3]+1][command[2]] != 10) return true
	if (v_field[command[3]+1][command[2]] != 10) return true
	if (v_field[command[3]][command[2]+1] != 10) return true
	if (v_field[command[3]][command[2]-1] != 10) return true
	return false
}
function evaluation(arr){
	var cnt_minus = 0
	var cnt_zero = 0
	var cnt_pulus = 0
	for (var p=0;p<arr.length;p++){
		if (arr[p]<0) cnt_minus++
		else if (arr[p]==0) cnt_zero++
		else cnt_pulus++
	}	
}
function min(arr){
	var index=0
	for (var i=1;i<arr.length;i++) if (arr[index] > arr[i]) index = i
	return arr[index]
}
function max(arr){
	var index=0
	for (var i=1;i<arr.length;i++) if (arr[index] < arr[i]) index = i
	return arr[index]
}
function max_index(arr){
	var index=0
	for (var i=1;i<arr.length;i++) if (arr[index] < arr[i]) index = i
	return index
}
function clone_2dim(arr){	//bは長方形とする
	var ret = []
	for (var i=0;i<arr.length;i++){
		ret.push(Array.from(arr[i]))
	}
	return ret
}
function only_length4(arr){
	ret = []
	var x = clone_2dim(arr)
	for (var i=0;i<x.length;i++){
		if (x[i].length==4){
			ret.push(x[i])
		}
	}
	return ret
}
