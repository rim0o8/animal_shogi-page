function fieldSuggestAndDecision(x,y){
	if (suggested.length > 0){
		if (suggested[0] == 'move'){
			for (var i=0;i<suggested.length;i++){
				if (equals(suggested[i], [x,y])){
					order_hub('move', selected, x, y)
				}
			}
		}
		else if (suggested[0] == 'summon'){
			for (var i=0;i<suggested.length;i++){
				if (equals(suggested[i], [x,y])){
					order_hub('summon', selected, x, y)
				}
			}
		}
		suggested = []
		toBright()
	}
	else{
		suggested.push('move')	//識別と移動不可(suggest=[])の駒とその他の駒の挙動の統一
		suggest_hub([x,y])
	}
}
function handSuggestAndDecision(piece){
	if (suggested.length > 0){
		suggested = []
		toBright()
	}
	else{
		suggested.push('summon')	//識別と移動不可(suggest=[])の駒とその他の駒の挙動の統一
		suggest_hub([piece])
	}
}