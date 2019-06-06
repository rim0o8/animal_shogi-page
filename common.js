function toDark(){
	for(var i=1;i<=4;i++){
		brightness('cell1'+i, 50)
		brightness('cell2'+i, 50)
		brightness('cell3'+i, 50)
	}
}
function toBright(){
	for(var i=1;i<=4;i++){
		brightness('cell1'+i, 100)
		brightness('cell2'+i, 100)
		brightness('cell3'+i, 100)
	}	
}
function canMove(x,y){
	if (0<x && x<=3){
		if (0<y && y<=4){
			if (!isAlly(field[y][x])){
				brightness('cell'+ String(x) + String(y), 100)
				suggested.push([x,y])
				return true
			}
		}
	}
	return false
}

function opacity(id, opacity){
	document.getElementById(id).style.opacity = opacity
}
function brightness(id, brightness){
	document.getElementById(id).style.filter="brightness("+ brightness + "%)"
}
function change_src(id, path){
	document.getElementById(id).src = path
}
function copy_src(id1, id2){
	document.getElementById(id1).src=document.getElementById(id2).src
}
function getPiece(piece){
	if (piece == 6 || piece == 10){	//味方ひよこorニワトリ
		if (hand[1] == 0){
			opacity('playerChick1', 1)
		}
		if (hand[1] == 1){
			opacity('playerChick2', 1)
		}
		hand[1]++
	}else if (piece == 7){
		if (hand[2] == 0){
			opacity('playerElephant1', 1)
		}
		if (hand[2] == 1){
			opacity('playerElephant2', 1)
		}
		hand[2]++
	}else if (piece == 8){
		if (hand[3] == 0){
			opacity('playerGiraffe1', 1)
		}
		if (hand[3] == 1){
			opacity('playerGiraffe2', 1)
		}
		hand[3]++
	}
	else if (piece == 1 || piece == 5){	//味方ひよこorニワトリ
		if (hand[6] == 0){
			opacity('aiChick1', 1)
		}
		if (hand[6] == 1){
			opacity('aiChick2', 1)
		}
		hand[6]++
	}else if (piece == 2){
		if (hand[7] == 0){
			opacity('aiElephant1', 1)
		}
		if (hand[7] == 1){
			opacity('aiElephant2', 1)
		}
		hand[7]++
	}else if (piece == 3){
		if (hand[8] == 0){
			opacity('aiGiraffe1', 1)
		}
		if (hand[8] == 1){
			opacity('aiGiraffe2', 1)
		}
		hand[8]++
	}
}
function playerORai(piece){	//for html_summon
	if (isAlly(piece2num(piece))){
		return 'player'
	}
	else{
		return 'ai'
	}
}
function piece2num(piece){
	if (piece == 'Chick'){
		return 1;
	}
	else if (piece == 'Elephant'){
		return 2;
	}
	else if (piece == 'Giraffe'){
		return 3;
	}
	else if (piece == 'aiChick'){
		return 6;
	}
	else if (piece == 'aiElephant'){
		return 7;
	}
	else if (piece == 'aiGiraffe'){
		return 8;
	}
}
function equals(a,b){
	if (a.toString() == b.toString()){
		return true
	}
	return false
}

// for concierge

function reverse(piece){	//駒の敵味方属性の変換
	if (piece==0){
		return
	}
	else if (piece<=5){
		return piece+5
	}
	else{
		return piece-5
	}
}
function isAlly(piece){
	return (piece != 0 && piece <=5)
}
function isEnemy(piece){
	return (6 <= piece)
}

function getRandom(size){
	Math.floor(Math.random()*size)
}

function player_win(){
	alert('You Win!!')	
}
function player_lose(){
	console.log('i win!')
}



















