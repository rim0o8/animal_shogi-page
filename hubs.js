function order_hub(order,selecteD,x,y){	//turnとlogの処理とaiのorder受付
	turn++
	log.push([selecteD,x,y])
	if(order=='move'){
		move(selecteD,x,y)
	}
	else if(order=='summon'){
		summon(selecteD,x,y)
	}
	ai_order()
	put('<-------------turnend-------------->')
}
function suggest_hub(list){
	if (list.length==1){
		summon_suggest(list[0])
	}
	else if (list.length==2){
		move_suggest(list[0],list[1])
	}
}
function move(selecteD,x,y){
	system_move([selecteD[0], selecteD[1], x, y])
	html_move([selecteD[0], selecteD[1], x, y])
}
function html_move(choice){
	copy_src("piece"+String(choice[2])+String(choice[3]),"piece"+String(choice[0])+String(choice[1]))
	opacity("piece"+String(choice[2])+String(choice[3]),1)
	opacity("piece"+String(choice[0])+String(choice[1]),0)
}
function summon(piece, x, y){
	html_summon([piece, x, y])
	system_summon([piece, x, y])
}
function html_summon(choice){
	change_src('piece'+String(choice[1])+String(choice[2]), src[piece2num(choice[0])])
	if (hand[piece2num(choice[0])] == 2){
		opacity(playerORai(choice[0])+choice[0]+'2', 0)
	}
	else if (hand[piece2num(choice[0])] == 1){
		opacity(playerORai(choice[0])+choice[0]+'1', 0)
	}
	opacity('piece'+String(choice[1])+String(choice[2]), 1)
	toBright()
}
function move_suggest(x,y){
	if (!isAlly(field[y][x])){
		return
	}
	selected = [x,y]
	toDark()
	brightness('cell'+ String(x) + String(y), 100)
	if (field[y][x] == 1){	//ひよこ
		canMove(x,y-1)
	}
	else if (field[y][x] == 2){	//ぞう
		canMove(x+1,y+1)
		canMove(x+1,y-1)
		canMove(x-1,y+1)
		canMove(x-1,y-1)
	}
	else if (field[y][x] == 3){	//キリン
		canMove(x,y+1)
		canMove(x,y-1)
		canMove(x+1,y)
		canMove(x-1,y)
	}
	else if (field[y][x] == 4){	//ライオン
		canMove(x+1,y+1)
		canMove(x+1,y-1)
		canMove(x-1,y+1)
		canMove(x-1,y-1)
		canMove(x,y+1)
		canMove(x,y-1)
		canMove(x+1,y)
		canMove(x-1,y)
	}
	else if(field[y][x] == 5){	//にわとり
		canMove(x,y+1)
		canMove(x,y-1)
		canMove(x+1,y)
		canMove(x-1,y)
		canMove(x-1,y-1)
		canMove(x+1,y-1)
	}
}
function summon_suggest(piece){
	if (hand[piece2num(piece)] == 0){
		suggested = []
		return
	}
	toDark()
	brightness('player'+piece+'2', 100)
	selected = piece
	for (var x=1;x<=3;x++){
		for (var y=1;y<=4;y++){
			if (field[y][x] == 0){
				brightness('cell'+String(x)+String(y), 100)
				suggested.push([x,y])
			}
		}
	}
}