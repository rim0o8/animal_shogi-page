class AnimalShogi:
	def __init__():
		#0:なし
		#1:先手ひよこ
		#2:先手ぞう
		#3:先手キリン
		#4:先手ライオン
		#5後手ひよこ
		#6後手ぞう
		#7後手キリン
		#8後手ライオン
		
		self.field = [
		#x=  0 1 2
			[7,8,6],	#y=0	後手サイド
			[0,5,0],	#y=1
			[0,1,0],	#y=2
			[2,4,3]		#y=3	先手サイド
		]
		self.first_hand = []		#先手の手持ち
		self.second_hand = []	#後手の手持ち
		self.log = []

		self.turn = 0 #偶数(0も含む)で先行のターン
	
	def evaluate(self):

	def battle(self):
		
		choice, loop = check()
		while(loop):
			self.field = think(self.field, choice)
			choice, loop = check()
			self.turn = self.turn + 1

		self.turn = self.turn - 1
		learn(log,self.turn%2)

	def think(self,field, turn, hand, depth):	#再帰構造
		###return 次の一手, 先手から見て、1:勝利 -1:敗北 0:互角
		choice, check = check(field, turn, hand)
		if check == False:
			if turn%2==0:
				return choice, 1
			else:
				return choice, -1
		else:
			for c in choice:
				

	def check(self, field, turn, hand):
		choice = []
		free = []
		if turn==0:
			for x in range(3):
				for y in range(4):
					if field[x][y] == 0:
						free.append([y,x])
			for h in hand:	#持ち駒の手
				for f in free:
					choice.append(h, f[0], f[1])

			for x in range(3):	#盤面の手
				for y in range(4):
					if field[y][x]==1:
						if field[y-1][x]==0 || field[y-1][x]>4:	#前
							choice.append([y,x,y-1,x])
					elif field[y][x]==2:
						if field[y-1][x-1]==0 || field[y-1][x-1]>4:	#左前
							choice.append(y,x,y-1,x-1)
						if field[y-1][x+1]==0 || field[y-1][x+1]>4:	#右前
							choice.append(y,x,y-1,x+1)
						if field[y+1][x-1]==0 || field[y+1][x-1]>4:	#左後
							choice.append(y,x,y+1,x-1)
						if field[y+1][x+1]==0 || field[y+1][x+1]>4:	#右後
							choice.append(y,x,y+1,x+1)
					elif field[y][x]==3:
						if field[y-1][x]==0 || field[y-1][x]>4:	#前
							choice.append(y,x,y-1,x)
						if field[y][x+1]==0 || field[y][x+1]>4:	#右
							choice.append(y,x,y,x+1)
						if field[y][x-1]==0 || field[y][x-1]>4:	#左
							choice.append(y,x,y,x-1)
						if field[y+1][x]==0 || field[y+1][x]>4:	#後
							choice.append(y,x,y+1,x)
					elif field[y][x]==4:
						if field[y-1][x-1]==0 || field[y-1][x-1]>4:	#左前
							choice.append(y,x,y-1,x-1)
						if field[y-1][x+1]==0 || field[y-1][x+1]>4:	#右前
							choice.append(y,x,y-1,x+1)
						if field[y+1][x-1]==0 || field[y+1][x-1]>4:	#左後
							choice.append(y,x,y+1,x-1)
						if field[y+1][x+1]==0 || field[y+1][x+1]>4:	#右後
							choice.append(y,x,y+1,x+1)
						if field[y-1][x]==0 || field[y-1][x]>4:	#前
							choice.append(y,x,y-1,x)
						if field[y][x+1]==0 || field[y][x+1]>4:	#右
							choice.append(y,x,y,x+1)
						if field[y][x-1]==0 || field[y][x-1]>4:	#左
							choice.append(y,x,y,x-1)
						if field[y+1][x]==0 || field[y+1][x]>4:	#後
							choice.append(y,x,y+1,x)
		if turn==1:
			for x in range(3):	#盤面の手
				for y in range(4):
					if field[y][x]==5:
						if field[y+1][x]<5:
							choice.append([y,x,y+1,x])	#前
					elif field[y][x]==6:
						if field[y-1][x-1]<5:	#左前
							choice.append(y,x,y-1,x-1)
						if field[y-1][x+1]<5:	#右前
							choice.append(y,x,y-1,x+1)
						if field[y+1][x-1]<5:	#左後
							choice.append(y,x,y+1,x-1)
						if field[y+1][x+1]<5:	#右後
							choice.append(y,x,y+1,x+1)
					elif field[y][x]==7:
						if field[y-1][x]<5:	#前
							choice.append(y,x,y-1,x)
						if field[y][x+1]<5:	#右
							choice.append(y,x,y,x+1)
						if field[y][x-1]<5:	#左
							choice.append(y,x,y,x-1)
						if field[y+1][x]<5:	#後
							choice.append(y,x,y+1,x)
					elif field[y][x]==8:
						if field[y-1][x-1]<5:	#左前
							choice.append(y,x,y-1,x-1)
						if field[y-1][x+1]<5:	#右前
							choice.append(y,x,y-1,x+1)
						if field[y+1][x-1]<5:	#左後
							choice.append(y,x,y+1,x-1)
						if field[y+1][x+1]<5:	#右後
							choice.append(y,x,y+1,x+1)
						if field[y-1][x]<5:	#前
							choice.append(y,x,y-1,x)
						if field[y][x+1]<5:	#右
							choice.append(y,x,y,x+1)
						if field[y][x-1]<5:	#左
							choice.append(y,x,y,x-1)
						if field[y+1][x]<5:	#後
							choice.append(y,x,y+1,x)

			if turn==0:
				for x in range(3):
					for y in range(4):
						if field[y][x]==8:
							lion_x = x
							lion_y = y
							break
			else:
				for x in range(3):
					for y in range(4):
						if field[y][x]==4:
							lion_x = x
							lion_y = y
							break
			for c in choice:
				if c[2] = lion_y:
					if c[3] = lion_x:
						return c, False
			return choice, True

	def reverse(self, piece):	#駒の敵味方属性の変換
		if piece==0:
			return
		elif piece<5:
			return piece+4
		else:
			return piece-4

	def v_move(self, choice, field, hand):	#思考上での一手
		if len(choice) == 3:
			hand.remove(choice[0])
			field[choice[1]][choice[2]] = choice[0]

		if field[choice[2]][choice[3]] > 4:
			hand.apped(reverse(field[2][3]))
			
		tmp = field[choice[0]][choice[1]]
		field[choice[0]][choice[1]] = field[choice[2]][choice[3]]
		field[choice[2]][choice[3]] = tmp

	def move(choice):
		if len(choice) == 3:
			if self.turn % 2 == 0:
				self.first_hand.remove(choice[0])
			else:
				self.second_hand.remove(choice[0])
			self.field[choice[1]][choice[2]] = choice[0]
			return

		if self.field[choice[2]][choice[3]] > 4:
			self.first_hand.apped(reverse(self.field[2][3]))
		elif self.field[choice[2]][choice[3]] > 0:
			self.second_hand.append(reverse(self.field[2][3]))
			
		tmp = self.field[choice[0]][choice[1]]
		self.field[choice[0]][choice[1]] = self.field[choice[2]][choice[3]]
		self.field[choice[2]][choice[3]] = tmp





