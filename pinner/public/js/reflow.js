var Reflow = {
	container: null,
	pins: null,
	cols: null,
	colHeightArray: [],
	pinCols: [],
	options: {
		colWidth: 190,
		padding: 5,
		container: '.container',
		pin: '.pin'
	},

	init: function(options) {
		$.extend(Reflow.options, options);
		this.container = $(Reflow.options.container);
		this.pins = $(Reflow.options.pin);
		this.cols = Math.floor(Reflow.container.width() / Reflow.options.colWidth);
		var i = Reflow.cols;
		while(i--) Reflow.colHeightArray[i] = 0;

		Reflow.reflow();
		window.onresize = Reflow.reflow;
	},

	add: function(data) {

	},

	smallestCol: function() {
		return this.colHeightArray.indexOf(Math.min.apply(null, this.colHeightArray));
	},

	reflow: function() {
		Reflow.cols = Math.floor(Reflow.container.width() / Reflow.options.colWidth);
		var i = Reflow.cols;
		Reflow.colHeightArray = []
		while(i--) {
			Reflow.colHeightArray[i] = 0;
			Reflow.pinCols[i] = [];
		}
		Reflow.pins.each(function(index, item) {
			var col = Reflow.smallestCol();
			var pin = $(item)
				.css('left', (col * Reflow.options.colWidth) + "px")
				.css('top', Reflow.colHeightArray[col] + "px")
				.data('col', col);
			Reflow.colHeightArray[col] += pin.height() + Reflow.options.padding * 2;
			item.onclick = Reflow.pinResize;
			Reflow.pinCols[col].push(item);
		})
	},

	pinResize: function() {
		var $this = $(this);
		var colIndex = Reflow.pinCols[$this.data('col')].indexOf(this);
		var colLength = Reflow.pinCols[$this.data('col')].length;
	}
}
/*
	pins.each(function() {
		var pin = $(this);
		var col = findSmallestCol(colHeightArray);
		pin.css('left', (col * colWidth) + "px") ;
		pin.css('top', colHeightArray[col] + "px");
		pin.data('col', col);
		colHeightArray[col] += pin.height() + 10;
	});
};

$('window').resize(function(e) {
	if(window.timeout) {
		clearTimeout(window.timeout);
	}
	setTimeout(reflow, 500);
});

$(reflow);
*/
$(function() {
	Reflow.init({});
})