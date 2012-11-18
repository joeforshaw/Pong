function Ball(body, velocity) {
	this.body = body;					// Rectangle
	this.velocity = velocity;			// Point


	this.move = move;
    function move() {
        this.body.position.x += this.velocity.x;
        this.body.position.y += this.velocity.y;
    }

    this.setVelocity = setVelocity;
    function setVelocity(x, y) {
    	this.velocity.x = x;
    	this.velocity.y = y;
    }

    this.processACollision = processACollision;
    function processACollision(player) {
    	if (ball.body.hasCollidedWith(player.body)) {
    		// Minkowski Sum
    		var wy = (this.body.width + player.body.width) * (this.body.getCenterY() - player.body.getCenterY());
			var hx = (this.body.height + player.body.height) * (this.body.getCenterX() - player.body.getCenterX());
			if (wy > hx) {
			    if (wy > -hx) {
			        // Bottom of paddle
			        // alert("Bottom of paddle");
			        console.log("Bottom");
			        ball.velocity.y = Math.abs(player.velocity.y + 1);
			    } else {
			        // Left of paddle
			        // alert("Left of paddle");
			        console.log("Left");	        
			    }
			    ball.velocity.x = -Math.abs(ball.velocity.x);
			} else {
			    if (wy > -hx) {
			        // Right of paddle
			        // alert("Right of paddle");
			        console.log("Right");		        
			    }
			    else {
			        // Top of paddle
			    	// alert("Top of paddle");
			    	console.log("Top");
			    	ball.velocity.y = Math.abs(player.velocity.y + 1);
			    }			    
			}
			if (player.name == "Player 1") ball.velocity.x = Math.abs(ball.velocity.x);
			else						   ball.velocity.x = -Math.abs(ball.velocity.x);
		}
	}

}