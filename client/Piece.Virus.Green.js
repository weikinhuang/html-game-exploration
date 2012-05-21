Classify("Game/Piece.Virus.Green", "Piece.Virus", {
	color : "rgba(0, 255, 0, 1)",
	draw : function(x, y) {
		this.context.fillStyle = this.color;
		this.parent();
	}
});