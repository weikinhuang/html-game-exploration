Classify("Game/Game", "FrameTimer", {
	boardHeight : 0,
	boardWidth : 0,
	pauseKey : "p",
	__static_ : {
		instance : null
	},
	invoke : function() {
		// this is a singleton
		if (this.instance === null) {
			this.instance = new this();
		}
		return this.instance;
	},
	init : function() {
		this.canvas = document.createElement("canvas");
		this.container = document.getElementById("board").appendChild(this.canvas);
		this.fpsContainer = document.getElementById("fps");
		this.bindWindowEvents();
	},
	clear : function() {
		this.canvas.width = this.boardWidth;
	},
	setWidth : function(width) {
		this.canvas.width = width;
		this.boardWidth = width;
		return this;
	},
	setHeight : function(height) {
		this.canvas.height = height;
		this.boardHeight = height;
		return this;
	},
	bindWindowEvents : function() {
		var self = this, blurred = false;
		$(window).on("blur", function() {
			if (self.isPaused) {
				return;
			}
			blurred = true;
			self.stop();
		}).on("focus", function() {
			if (!blurred) {
				return;
			}
			blurred = false;
			self.start();
		});

		this.onKeyup = new Classify("Game").Keyboard.Keyup(window);
		this.onKeydown = new Classify("Game").Keyboard.Keydown(window);
		this.onKeypress = new Classify("Game").Keyboard.Keypress(window);

		if(this.pauseKey) {
			this.onKeypress.bind("p", function() {
				self.pause();
			});
		}
	},
	startFpsLog : function() {
		var self = this, t = 0;
		if (this.fpsTimer) {
			return this;
		}
		this.fpsTimer = setInterval(function() {
			// console.log(self.tick - t);
			self.fpsContainer.innerHTML = (self.tick - t) + " fps";
			t = self.tick;
		}, 1000);
		return this;
	},
	stopFpsLog : function() {
		clearInterval(this.fpsTimer);
		this.fpsTimer = null;
		return this;
	}
});
