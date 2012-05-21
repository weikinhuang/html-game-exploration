Classify("Game/Board", "Array", {
	width : 0,
	height : 0,
	area : 0,
	init : function(width, height) {
		this.width = width;
		this.height = height;
		this.area = width * height;
		this.fill(this.area, null);
	},
	set : function(x, y, item) {
		this[this.getIndexFromCoords(x, y)] = item;
		return this;
	},
	get : function(x, y) {
		return this[this.getIndexFromCoords(x, y)];
	},
	getCoordsFromIndex : function(index) {
		return [ index % this.width, Math.floor(index / this.width) ];
	},
	getIndexFromCoords : function(x, y) {
		return x + (y * this.width);
	},
	getColumn : function(col) {
		var i = 0, len = this.height, items = [];
		while (i < len) {
			items[items.length] = this[(this.width * i) + col];
			i++;
		}
		var obj = new Classify("Game").Array;
		obj.push.apply(obj, items);
		return obj;
	},
	getRow : function(row) {
		var i = 0, len = this.width, items = [];
		while (i < len) {
			items[items.length] = this[row * i];
			i++;
		}
		var obj = new Classify("Game").Array;
		obj.push.apply(obj, items);
		return obj;
	}
});
