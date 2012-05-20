(function() {
	var specialKeys = {
		8 : "backspace",
		9 : "tab",
		13 : "return",
		16 : "shift",
		17 : "ctrl",
		18 : "alt",
		19 : "pause",
		20 : "capslock",
		27 : "esc",
		32 : "space",
		33 : "pageup",
		34 : "pagedown",
		35 : "end",
		36 : "home",
		37 : "left",
		38 : "up",
		39 : "right",
		40 : "down",
		45 : "insert",
		46 : "del",
		96 : "0",
		97 : "1",
		98 : "2",
		99 : "3",
		100 : "4",
		101 : "5",
		102 : "6",
		103 : "7",
		104 : "8",
		105 : "9",
		106 : "*",
		107 : "+",
		109 : "-",
		110 : ".",
		111 : "/",
		112 : "f1",
		113 : "f2",
		114 : "f3",
		115 : "f4",
		116 : "f5",
		117 : "f6",
		118 : "f7",
		119 : "f8",
		120 : "f9",
		121 : "f10",
		122 : "f11",
		123 : "f12",
		144 : "numlock",
		145 : "scroll",
		191 : "/",
		224 : "meta"
	};
	var shiftNums = {
		"`" : "~",
		"1" : "!",
		"2" : "@",
		"3" : "#",
		"4" : "$",
		"5" : "%",
		"6" : "^",
		"7" : "&",
		"8" : "*",
		"9" : "(",
		"0" : ")",
		"-" : "_",
		"=" : "+",
		";" : ": ",
		"'" : "\"",
		"," : "<",
		"." : ">",
		"/" : "?",
		"\\" : "|"
	};

	Classify("Game/Keyboard", "Array", {
		element : null,
		$element : null,
		init : function(element) {
			this.element = element;
			this.$element = $(element);
		},
		bind : function(key, callback, context) {
			if (this.length === 0) {
				this.$element.on(this.type, this.onKey);
			}
			this.push({
				key : key,
				callback : callback,
				context : context || this
			});
			return this;
		},
		unbind : function(key, callback) {
			if (this.length === 1) {
				this.$element.on(this.type, this.onKey);
			}
			var i = 0, len = this.length;
			while (i < l) {
				if (this[i].key === key && this[i].callback === callback) {
					this.splice(i, 1);
					return this;
				}
				i++;
			}
			return this;
		},
		__bind_onKey : function(event) {
			var possibleKeys = this.getKeys(event);
			this.forEach(function(bind) {
				if (bind.key === null || possibleKeys[bind.key]) {
					bind.callback.call(bind.context, event);
				}
			});
		},
		getKeys : function(event) {
			// check for special modifier
			var special = event.type !== "keypress" && specialKeys[event.which],
			// get the character that the event is
			character = String.fromCharCode(event.which).toLowerCase(),
			// check modifiers and possible combos
			modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if (event.altKey && special !== "alt") {
				modif += "alt+";
			}
			if (event.ctrlKey && special !== "ctrl") {
				modif += "ctrl+";
			}
			if (event.metaKey && !event.ctrlKey && special !== "meta") {
				modif += "meta+";
			}
			if (event.shiftKey && special !== "shift") {
				modif += "shift+";
			}

			if (special) {
				possible[modif + special] = true;
			} else {
				possible[modif + character] = true;
				possible[modif + shiftNums[character]] = true;
				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if (modif === "shift+") {
					possible[shiftNums[character]] = true;
				}
			}
			return possible;
		}
	});
})();
