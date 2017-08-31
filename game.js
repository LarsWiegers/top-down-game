var user;
var zombies = [];
var ZOMBIE_SIZE = 100;
var score = 0;
var highscore = 0;

var tick = 0;
var MAXTICKS = 60;


function setup() {
    createCanvas(windowWidth, windowHeight);
    user  = new User();
    for(var i = 0; i < ZOMBIE_SIZE ; i++) {
        var zombie = new Zombie();
        zombie.checkPosition();
        zombies.push(zombie);
    }
}

function draw() {
    tick++;
    clear();
    user.checkPosition();
    user.display();

    if (keyIsDown(LEFT_ARROW))
        user.moveLeft();

    if (keyIsDown(RIGHT_ARROW))
        user.moveRight();

    if (keyIsDown(UP_ARROW))
        user.moveUp();

    if (keyIsDown(DOWN_ARROW))
        user.moveDown();

    zombies.forEach(function(zombie, index) {
        zombie.display();
        zombie.move();
        zombie.checkPosition();
    });

    is_user_being_eaten(user, zombies);
    score += 1;
    fill(255);
    textSize(16);
    text("score " + score , 0 , 16);
    text("highscore  " + highscore , 0 , 36);

    if(tick > 60) {
        tick = 0;
    }
}
function is_user_being_eaten(user ,zombies) {
    zombies.forEach(function(zombie, index) {
        if (zombie.x < user.x + user.diameter &&
            zombie.x + zombie.diameter > user.x &&
            zombie.y < user.y + user.diameter &&
            zombie.diameter + zombie.y > user.y) {
            // collision detected!
            if(highscore < score) {
                highscore = score;
            }

            score = 0;
        }
    });

}