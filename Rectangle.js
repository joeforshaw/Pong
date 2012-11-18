function Rectangle(width, height, x, y, colour) {
	this.width = width;
	this.height = height;
	this.position = new Point(x, y); // Co-ordinates of top left point
    this.colour = colour;
    
    this.getCenter = getCenter;
    function getCenter() {
        var x = (this.getLeft() + this.getRight())  / 2;
        var y = (this.getTop    + this.getBottom()) / 2;
        return new Point(x, y);
    }

    this.getCenterX = getCenterX;
    function getCenterX() {
        return (this.getLeft() + this.getRight())  / 2;
    }

    this.getCenterY = getCenterY;
    function getCenterY() {
        return (this.getTop() + this.getBottom()) / 2;
    }

    this.getLeft = getLeft;
    function getLeft() {
        return this.position.x
    }

    this.getRight = getRight;
    function getRight() {
        return this.position.x + width;
    }

    this.getTop = getTop;
    function getTop() {
        return this.position.y;
    }

    this.getBottom = getBottom;
    function getBottom() {
        return this.position.y + height;
    } 
  
    this.draw = draw;
    function draw(context) {
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
    this.hasCollidedWith = hasCollidedWith;
    function hasCollidedWith(rectangle) {
        // Bottom
        if (this.getBottom() <= rectangle.getTop()) {
            return false;
        // Top
        } else if (this.getTop() >= rectangle.getBottom()) {
            return false;
        // Left
        } else if (this.getRight() <= rectangle.getLeft()) {
            return false;
        }
        // Right
        else if (this.getLeft() >= rectangle.getRight()) {
            return false;
        } else {
            // console.log("Bottom - ball=" + this.getTop()    + " rectangle=" + rectangle.getBottom());
            // console.log("Top    - ball=" + this.getBottom() + " rectangle=" + rectangle.getTop());
            // console.log("Left   - ball=" + this.getRight()  + " rectangle=" + rectangle.getLeft());
            // console.log("Right  - ball=" + this.getLeft()   + " rectangle=" + rectangle.getRight());
            return true;
        }
    }

    

}