function Text(text, size, style, colour, position) {
	this.text     = text;     // String
	this.size     = size;     // Number (in px)
	this.style    = style;    // String
	this.colour   = colour;   // String
	this.position = position; // Point

	this.draw = draw;
	function draw(context) {
		context.fillStyle = this.colour;
		context.font = this.size + "px " + this.style;
		context.fillText(this.text, this.position.x, this.position.y);
	}

	this.setText = setText;
	function setText(text) {
		this.text = "" + text;
	}

}
