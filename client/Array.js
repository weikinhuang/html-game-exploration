Classify("Game/Array", {
	length : 0,
	toArray : function() {
		return Array.prototype.slice.call(this, 0);
	},
	pop : Array.prototype.pop,
	push : Array.prototype.push,
	reverse : Array.prototype.reverse,
	shift : Array.prototype.shift,
	sort : Array.prototype.sort,
	splice : function(index, length) {
		var items = Array.prototype.splice.apply(this.toArray(), arguments);
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	unshift : function() {
		Array.prototype.unshift.apply(this, arguments);
		return this.length;
	},
	concat : function(value) {
		var items = Array.prototype.concat.apply(this.toArray(), arguments);
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	join : function(separator) {
		return this.toArray().join(separator);
	},
	slice : function(begin, end) {
		var items = Array.prototype.slice.apply(this.toArray(), arguments);
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	copy : function() {
		var items = Array.prototype.splice.call(this.toArray(), 0);
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	fill : function(length, value) {
		this.clear();
		while (length-- > 0) {
			this.push(value);
		}
		return this;
	},
	indexOf : Array.prototype.indexOf || function(value) {
		var i = 0, len = this.length;
		while (i < len) {
			if (this[i] === value) {
				return i;
			}
			i++;
		}
		return -1;
	},
	lastIndexOf : Array.prototype.lastIndexOf || function(value) {
		var i = this.length;
		while (i--) {
			if (this[i] === value) {
				return i;
			}
		}
		return -1;
	},
	include : function(value) {
		return this.indexOf(value) != -1;
	},
	clear : function() {
		this.length = 0;
		return this;
	},
	first : function() {
		return this[0];
	},
	last : function() {
		return this[this.length - 1];
	},
	size : function() {
		return this.length;
	},
	rand : function() {
		return this[Math.round(Math.random() * (this.length - 1))];
	},
	asyncEach : function(iterator, callback, context, delay) {
		// clone this array
		var start, timer, stop = false, temp = this.toArray(), array = this, i = 0, processor = function() {
			start = +new Date();
			// iterate through each item
			do {
				// we can quit at any time
				if (iterator.call(context || null, temp.shift(), i++, array) === false) {
					stop = true;
					break;
				}
			} while (!stop && temp.length > 0 && (+new Date() - start < 50));
			// we're not finished yet, let's wait a little
			if (!stop && temp.length > 0) {
				timer = setTimeout(processor, delay || 25);
			} else {
				// we're done, run the callback
				callback && callback.call(context || null, array);
			}
		};
		// process them slowly
		timer = setTimeout(processor, delay || 25);
		return this;
	},
	every : Array.prototype.every || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			if (!iterator.call(context || null, this[i], i, this)) {
				return false;
			}
			i++;
		}
		return true;
	},
	filter : function(iterator, context) {
		var items, i, len;
		if (Array.prototype.filter) {
			items = Array.prototype.filter.apply(this, arguments);
		} else {
			items = [];
			i = 0;
			len = this.length;
			while (i < len) {
				if (iterator.call(context || null, this[i], i, this)) {
					items[items.length] = this[i];
				}
				i++;
			}
		}
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	forEach : Array.prototype.forEach || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			iterator.call(context || null, this[i], i, this);
			i++;
		}
	},
	map : function(iterator, context) {
		var items, i, len;
		if (Array.prototype.map) {
			items = Array.prototype.map.apply(this, arguments);
		} else {
			items = [];
			i = 0;
			len = this.length;
			while (i < len) {
				items[items.length] = iterator.call(context || null, this[i], i, this);
				i++;
			}
		}
		var obj = new this.constructor();
		obj.push.apply(obj, items);
		return obj;
	},
	some : Array.prototype.some || function(iterator, context) {
		var i = 0, len = this.length;
		while (i < len) {
			if (iterator.call(context || null, this[i], i, this)) {
				return true;
			}
			i++;
		}
		return false;
	},
	reduce : Array.prototype.reduce || function(iterator) {
		var i = 0, len = this.length, accumulator;
		if (arguments.length < 2) {
			if (len === 0) {
				throw new TypeError("Array length is 0 and no second argument");
			}
			accumulator = this[0];
			i = 1; // start accumulating at the second element
		} else {
			accumulator = arguments[1];
		}
		while (i < l) {
			accumulator = iterator.call(null, accumulator, this[i], i, this);
			++i;
		}
		return accumulator;
	},
	reduceRight : Array.prototype.reduceRight || function(iterator) {
		var len = this.length;
		// no value to return if no initial value, empty array
		if (len === 0 && arguments.length === 1) {
			throw new TypeError("Array length is 0 and no second argument");
		}

		var i = len - 1, accumulator;
		if (arguments.length >= 2) {
			accumulator = arguments[1];
		} else {
			accumulator = this[i--];
		}

		while (i >= 0) {
			accumulator = iterator.call(null, accumulator, this[i], i, this);
			i--;
		}

		return accumulator;
	}
});
