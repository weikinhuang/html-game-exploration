Classify("Game/Piece.Virus.Blue", "Piece.Virus", {
	color : "rgba(0, 0, 255, 1)",
	draw : function(x, y) {
		this.context.fillStyle = this.color;
		this.parent();
	}
});