Classify("Game/Piece.Virus", "Piece", {
	width : 0,
	height : 0,
	x : 0,
	y : 0,
	init : function(canvas) {
		this.context = canvas.getContext("2d");
	},
	drawPiece : function(x, y) {
		this.x = x;
		this.y = y;
	}
});
