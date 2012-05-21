Classify("Game/Piece.Pill.Blue", "Piece.Pill", {
	color : "rgba(0, 0, 255, 1)",
	draw : function(x, y) {
		this.context.fillStyle = this.color;
		this.parent();
	}
});
