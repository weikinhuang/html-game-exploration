Classify("Game/Game", "FrameTimer", {
	fpsTimer : null,
	x : 10,
	y : 10,
	dx : 4,
	dy : 4,
	r : 10,
	boardWidth : 300,
	boardHeight : 200,
	__static_ : {
		instance : null
	},
	invoke : function() {
		if (this.instance === null) {
			this.instance = new this();
		}
		return this.instance;
	},
	init : function() {
		this.canvas = document.createElement("canvas");
		this.canvas.style.height = this.boardHeight + "px";
		this.canvas.style.width = this.boardWidth + "px";
		this.container = document.getElementById("board").appendChild(this.canvas);
		this.fpsContainer = document.getElementById("fps");
		this.ball = this.canvas.getContext('2d');
	},
	runLoop : function() {
		this.clear();
		this.move();
		this.ball.fillStyle = 'rgb(0, 0, 0)';
		this.ball.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		this.ball.closePath();
		this.ball.fill();
	},
	move : function() {
		if ((this.x - this.r) < 0 || (this.x + this.r) > this.canvas.width) {
			this.dx = -1 * this.dx;
		}
		if ((this.y - this.r) < 0 || (this.y + this.r) > this.canvas.height) {
			this.dy = -1 * this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
	},
	clear : function() {
		this.canvas.width = 300;
	},
	startFpsLog : function() {
		var self = this, t = 0;
		this.fpsTimer = setInterval(function() {
			// console.log(self.tick - t);
			self.fpsContainer.innerHTML = (self.tick - t) + " fps";
			t = self.tick;
		}, 1000);
	},
	stopFpsLog : function() {
		clearInterval(this.fpsTimer);
	}
});
