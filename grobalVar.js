var selected
var suggested=[]
var field = [
//0:なし
//1:先手ひよこ
//2:先手ぞう
//3:先手キリン
//4:先手ライオン
//5:先手にわとり
//6:後手ひよこ
//7:後手ぞう
//8:後手キリン
//9:後手ライオン
//10:後手にわとり
//x= 0 1 2 3
	[0,0,0,0],	//y=0	意味のない行
	[0,8,9,7],	//y=1	後手サイド
	[0,0,6,0],	//y=2
	[0,0,1,0],	//y=3
	[0,2,4,3]	//y=4	先手サイド
]
var hand = [0,0,0,0,0,0,0,0,0]	//手持ち[none,先手ひよこ,先手ぞう,先手キリン,none,none,後手ひよこ,後手ぞう,後手キリン]
var log = []
var turn = 0 //偶数(0も含む)で先行のターン
var src=[
	[],
	['img/chick.gif'],
	['img/elephant.gif'],
	['img/giraffe.gif'],
	['img/lion.gif'],
	['img/chicken.gif'],
	['img/chick_in.gif'],
	['img/elephant.git'],
	['img/giraffe_in.gif'],
	['img/lion_in.gif'],
	['img/chicken_in.gif']
]
