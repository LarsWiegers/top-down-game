let user;
let zombies = [];
let tick = 0;
let userPressedKey = false;
let bullets = [];
function setup() {
    user = new User(windowWidth/2,windowHeight/2,0,loadImage("images/user.png"),32,48);
    for(let i = 0; i < 100 ; i++) {
        zombies[i] = new Zombie(windowWidth/2,windowHeight/2,0,loadImage("images/zombie.png"),32,48);
    }
    createCanvas(window.innerWidth, window.innerHeight);
}
function draw() {
    tick++;
    clear();
    user.displaySprite();
    zombies.forEach(function(zombie) {
        zombie.displaySprite();
        zombie.moveRandom();
    });
    updateBullets();

    if (keyIsDown(LEFT_ARROW)){
        user.moveLeft();
        userPressedKey = true;
    }
    if (keyIsDown(RIGHT_ARROW)){
        user.moveRight();
        userPressedKey = true;
    }
    if (keyIsDown(UP_ARROW)) {
        user.moveUp();
        userPressedKey = true;
    }
    if (keyIsDown(DOWN_ARROW)) {
        user.moveDown();
        userPressedKey = true;
    }

    if( tick % 16 === 0 )  {
        // update all animations
        if(userPressedKey === true) {
            user.updateSpritePosition();
        }
        zombies.forEach(function(zombie) {
            zombie.updateSpritePosition();
        });

    }
    // last thing that should be done
    resetEverything();
}
function keyPressed() {
    if(keyCode === 32) {
        user.shoot();
    }
}
function updateBullets() {
    bullets.forEach(function(bullet,index) {
        bullet.display();
        bullet.move();
        if( bullet.checkForImpact(zombies) ) {
            bullets.splice(index,1);

        }
        if (! bullet.stillOnScreen() ) {
            bullets.splice(index,1);
        }
    });
}
function resetEverything(){
    if(tick > 60){
        tick = 0;
    }
    userPressedKey = false;
}
