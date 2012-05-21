Classify("Game/Piece", {
	width : 20,
	height : 20,
	x : 0,
	y : 0,
	init : function(canvas) {
		this.context = canvas.getContext("2d");
	},
	setPosition : function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	moveBy : function(x, y) {

	},
	draw : function() {
	}
});
