Classify("Game/Piece.Virus.Red", "Piece.Virus", {
	color : "rgba(255, 0, 0, 1)",
	draw : function(x, y) {
		this.context.fillStyle = this.color;
		this.parent();
	}
});