function system_move(choice){
	if (field[choice[3]][choice[2]] != 0){
		getPiece(field[choice[3]][choice[2]])
	}
	field[choice[3]][choice[2]] = field[choice[1]][choice[0]]
	field[choice[1]][choice[0]] = 0
}
function system_summon(choice){	//now
	hand[piece2num(choice[0])]--
	field[choice[2]][choice[1]] = piece2num(choice[0])
	return
}