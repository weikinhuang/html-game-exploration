Classify("Game/Game.Board", "Game", {
	fpsTimer : null,
	rows : 17,
	cols : 8,
	colors : 3,
	startHeight : 8,
	startDensity : 0.8,
	startMaxPerRow : 2,
	dropRate : 500, // number of ms to move one board position
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
						piece = new Piece.Virus[colors.pop()](this.canvas);
						this.board.set(i, h, piece);
					} while (this.isMatch(i, h, this.startMaxPerRow));
					piece.setPosition((this.cols - i - 1) * piece.width, (this.rows - h - 1) * piece.height).draw();
				}
			}
			h++;
		}
	},
	isMatch : function(x, y, limit) {
		// matching
		// OOOXOOO
		// OOOXOOO
		// OOOXOOO
		// XXXXXXX
		// OOOXOOO
		// OOOXOOO
		// OOOXOOO
		// scan x
		var minX, maxX, len = 0, x1, x2, threshold = limit - 1;
		minX = Math.max(0, x - limit);
		maxX = Math.min(this.cols - 1, x + limit);
		while (minX <= maxX) {
			x1 = this.board.get(minX, y);
			x2 = this.board.get(minX + 1, y);
			if (x1 && x2 && x1.color === x2.color) {
				len++;
			} else {
				len = 0;
			}
			if (len === threshold) {
				return true;
			}
			minX++;
		}
		// scan y
		minY = Math.max(0, y - limit);
		maxY = Math.min(this.rows - 1, y + limit);
		while (minY <= maxY) {
			x1 = this.board.get(x, minY);
			x2 = this.board.get(x, minY + 1);
			if (x1 && x2 && x1.color === x2.color) {
				len++;
			} else {
				len = 0;
			}
			if (len === threshold) {
				return true;
			}
			minY++;
		}

		return false;
	}
});
