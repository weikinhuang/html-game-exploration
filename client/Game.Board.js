Classify("Game/Game.Board", "Game", {
	fpsTimer : null,
	rows : 17,
	cols : 8,
	colors : 3,
	startHeight : 8,
	startDensity : 0.4,
	colors : Classify("Game").Array("Red", "Green", "Blue"),
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
		this.parent();
		this.board = new Classify("Game").Board(this.cols, this.rows);
		this.setWidth(this.cols * 20);
		this.setHeight(this.rows * 20);
		this.fillRand();
	},
	runLoop : function() {
		this.clear();
		this.drawSetPieces();
		this.drawPlayer();
		this.drawCascade();
		this.drawAttacks();
		// this.move();
		// this.clear();
		// this.ball.fillStyle = 'rgb(0, 0, 0)';
		// this.ball.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		// this.ball.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		// this.ball.closePath();
		// this.ball.fill();
		// this.ball.save();
	},
	drawSetPieces : function() {
		this.board.forEach(function(piece) {
			if (piece !== null) {
				piece.draw();
			}
		});
	},
	drawPlayer : function() {

	},
	drawCascade : function() {

	},
	drawAttacks : function() {

	},
	fillRand : function() {
		var startHeight = this.startHeight, h = 0, i, len = this.cols, Piece = Classify("Game").Piece, colors, piece;
		while (h < startHeight) {
			for (i = 0; i < len; i++) {
				if (Math.random() <= this.startDensity) {
					colors = this.colors.copy().shuffle();
					do {
						piece = new Piece.Pill[colors.pop()](this.canvas);
						this.board.set(i, h, piece);
					} while (this.isMatch(i, h));
					piece.setPosition((this.cols - i - 1) * piece.width, (this.rows - h - 1) * piece.height).draw();
				}
			}
			h++;
		}
	},
	isMatch : function(x, y) {

		return false;
	}
});
