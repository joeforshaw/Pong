function Player(body, name, upCode, downCode, arena) {
	this.body = body;                // Rectangle
	this.score = 0;                  // Number
	this.name = name;                // String
	this.velocity = new Point(0, 0); // Point
	this.upCode = upCode;            // Number
	this.downCode = downCode;        // Number
	this.arena = arena;              // Point

	this.move = move;
	function move() {
		if (this.body.getTop() + this.velocity.y > 0
			&& this.body.getBottom() + this.velocity.y <= this.arena.y) {
			this.body.position.y += this.velocity.y;
		}
	}

}
