/*
 * Canvas implementation of Pong
 * 
 * Joe Forshaw (@JoeDForshaw)
 * 3/11/2012
 */

var canvas;              // Javascript canvas we're using
var context;	         // Current context of the canvas
var background;          // Background rectangle
var player1;             // Player 1's paddle
var player1Score;        // Player 1's score
var player2;             // Player 2's paddle
var player2Score;        // Player 2's score
var ball;                // Ball
var initialBallVelocity; // Velocity of the ball on startup

// Constants
BACKGROUND_DIMENSIONS       = new Point(600,   400);
BALL_SIZE                   = 10;
BALL_SPEED                  = 2;
PADDLE_PADDING_SCALE        = new Point(0.05, 0.05);
PADDLE_DIMENSIONS           = new Point(  10,   50);
PADDLE_SPEED                = 2;
PLAYER_1_UP_KEY             = 87;
PLAYER_1_DOWN_KEY           = 83;
PLAYER_2_UP_KEY             = 38;
PLAYER_2_DOWN_KEY           = 40;
REFRESH_RATE                = 1;
SCORE_PADDING_SCALE         = new Point( 0.3,  0.1);
TEXT_SIZE                   = 48; // in px

// Calculated Constants
INITIAL_BALL_POSITION       = new Point(BACKGROUND_DIMENSIONS.x * 0.5 - BALL_SIZE * 0.5,
                                        BACKGROUND_DIMENSIONS.y * 0.5 - BALL_SIZE * 0.5);
INITIAL_PLAYER_1_POSITION   = new Point(BACKGROUND_DIMENSIONS.x * PADDLE_PADDING_SCALE.x,
                                        BACKGROUND_DIMENSIONS.y * 0.5 - PADDLE_DIMENSIONS.y * 0.5);
INITIAL_PLAYER_2_POSITION   = new Point(BACKGROUND_DIMENSIONS.x * (1 - PADDLE_PADDING_SCALE.x) - PADDLE_DIMENSIONS.x,
                                        BACKGROUND_DIMENSIONS.y * 0.5 - PADDLE_DIMENSIONS.y * 0.5);

// Start of execution
init();
run();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	initBackground();
	initBall();
	initPlayers();
	initScores();
	initPlayerActionListeners();
}

function initBackground() {
	background = new Rectangle(BACKGROUND_DIMENSIONS.x, BACKGROUND_DIMENSIONS.y, 0, 0, "#000000");
}

function initBall() {
	initialBallVelocity = new Point(-1, 1 );
	ball = new Ball(new Rectangle(BALL_SIZE, BALL_SIZE, INITIAL_BALL_POSITION.x, INITIAL_BALL_POSITION.y, "#FFFFFF"),
			new Point(initialBallVelocity.x, initialBallVelocity.y));
}

function initPlayers() {
	player1 = new Player(new Rectangle(PADDLE_DIMENSIONS.x, PADDLE_DIMENSIONS.y, INITIAL_PLAYER_1_POSITION.x, INITIAL_PLAYER_1_POSITION.y, "#FFFFFF"),
	                     "Player 1", PLAYER_1_UP_KEY, PLAYER_1_DOWN_KEY, BACKGROUND_DIMENSIONS);
	player2 = new Player(new Rectangle(PADDLE_DIMENSIONS.x, PADDLE_DIMENSIONS.y, INITIAL_PLAYER_2_POSITION.x, INITIAL_PLAYER_2_POSITION.y, "#FFFFFF"),
                             "Player 2", PLAYER_2_UP_KEY, PLAYER_2_DOWN_KEY, BACKGROUND_DIMENSIONS);
}

function initScores() {
	player1Score = new Text(player1.score, TEXT_SIZE, "sans-serif", "#FFFFFF",
	                        new Point(BACKGROUND_DIMENSIONS.x * SCORE_PADDING_SCALE.x - TEXT_SIZE, BACKGROUND_DIMENSIONS.x * SCORE_PADDING_SCALE.y));
	player2Score = new Text(player2.score, TEXT_SIZE, "sans-serif", "#FFFFFF",
                                new Point(BACKGROUND_DIMENSIONS.x - BACKGROUND_DIMENSIONS.x * SCORE_PADDING_SCALE.x, BACKGROUND_DIMENSIONS.x * SCORE_PADDING_SCALE.y));
}

function initPlayerActionListeners() {
	document.onkeydown = function(event) {
		code = keyCodeOf(event);
		if (code == player1.upCode) {
			player1.velocity.y = -PADDLE_SPEED;
		}
		if (code == player1.downCode) {
			player1.velocity.y = PADDLE_SPEED;
		}
		if (code == player2.upCode) {
			player2.velocity.y = -PADDLE_SPEED;
		}
		if (code == player2.downCode) {
			player2.velocity.y = PADDLE_SPEED;
		}
	}
	document.onkeyup = function(event) {
		code = keyCodeOf(event);
		if (code == player1.upCode || code == player1.downCode) {
			player1.velocity.y = 0;
		}
		if (code == player2.upCode || code == player2.downCode) {
			player2.velocity.y = 0;
		}
	}
}

function keyCodeOf(event) {
	if (!event) {
		event = window.event;
	}
	code = event.keyCode;
	if (event.charCode && code == 0) {
		code = event.charCode;
	}
	return code;
}

// Main execution loop
function run() {
	var runLoop = function() {        
		ball.move();
		player1.move();
		player2.move();
		processPositionOf(ball);
		drawFrame();      
		setTimeout(runLoop, REFRESH_RATE);
    	}
	runLoop();
}

function drawFrame() {
	background.draw(context);
	ball.body.draw(context);
	player1.body.draw(context);
	player2.body.draw(context);
	player1Score.draw(context);
	player2Score.draw(context);    
}

function processPositionOf(ball) {
	// If ball has been hit by a paddle
	ball.processACollision(player1);
	ball.processACollision(player2);
	// If ball has hit the top/bottom of court
	if (ball.body.position.y < 0 || ball.body.position.y + BALL_SIZE >= BACKGROUND_DIMENSIONS.y) {
		ball.velocity.y *= -1;
	}
	// If ball has hit the right of court i.e. player 1 has scored
	else if (ball.body.position.x + BALL_SIZE >= BACKGROUND_DIMENSIONS.x) {        
		player1Score.setText(++player1.score);
        	initialBallVelocity.x = -Math.abs(initialBallVelocity.x);
        	nextRound();
	}
	// If ball has hit the left of court i.e. player 2 has scored
	else if (ball.body.position.x < 0) {
		player2Score.setText(++player2.score);
		initialBallVelocity.x = Math.abs(initialBallVelocity.x);
		nextRound();
	}
}

function nextRound() {
	initialBallVelocity.y = -initialBallVelocity.y;
	ball.body.position    = new Point(INITIAL_BALL_POSITION.x, INITIAL_BALL_POSITION.y);
	ball.velocity         = new Point(initialBallVelocity.x, initialBallVelocity.y);
	player1.body.position = new Point(BACKGROUND_DIMENSIONS.x * PADDLE_PADDING_SCALE.x,
						BACKGROUND_DIMENSIONS.y * 0.5 - PADDLE_DIMENSIONS.y * 0.5);
	player1.velocity.y    = 0;
	player2.body.position = new Point(BACKGROUND_DIMENSIONS.x * (1 - PADDLE_PADDING_SCALE.x) - PADDLE_DIMENSIONS.x,
						BACKGROUND_DIMENSIONS.y * 0.5 - PADDLE_DIMENSIONS.y * 0.5);
	player2.velocity.y    = 0;
}
