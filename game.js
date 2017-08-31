let user;
let zombies = [];
let tick = 0;
let userPressedKey = false;
let bullets = [];
let pickUps = [];
const pickUpPropability = 0.75;
let score = 0;
let gun;

function setup() {
    user = new User(windowWidth / 2, windowHeight / 2, 0, loadImage("images/user.png"), 32, 48);

    for (let i = 0; i < 100; i++) {
        zombies[i] = new Zombie(windowWidth - 50, windowHeight / 2, 0, loadImage("images/zombie.png"), 32, 48);
    }
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    tick++;
    clear();
    updatepickUps();
    user.displaySprite();
    user.pickUpGun(pickUps);
    if (keyIsDown(LEFT_ARROW)) {
        user.moveLeft();
        userPressedKey = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
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

    updateZombies();
    updateBullets();
    if (tick % 32 === 0) {
        if (random(0, 1) > pickUpPropability) {
            pickUps.push(newRandomGun());
        }
    }
    if (tick % 16 === 0) {
        // update all animations
        if (userPressedKey === true) {
            user.updateSpritePosition();
        } else {
            if (user.spritePosition === 1 || user.spritePosition === 3) {
                user.updateSpritePosition();
            }
        }
        zombies.forEach(function (zombie) {
            zombie.updateSpritePosition();
        });

    }
    displayAmmoAndReload();
    displayScore();

    // last thing that should be done
    resetEverything();
}

function keyPressed() {
    if (keyCode === 32) {
        // spacebar
        user.shoot();
    }

    if (keyCode === 82) {
        // R key
        user.reload();
    }
}

function updatepickUps() {
    pickUps.forEach(function (gun, index) {
        gun.display();
        if (gun.pickUp(user)) {
            user.gun = gun;
            pickUps.splice(index, 1);
        }
    });
}

function updateZombies() {
    zombies.forEach(function (zombie, i) {
        zombie.displaySprite();
        zombie.run();
        if (zombie.isInReachForUser(user)) {
            user = null;
        }
        for (let j = 0; j < zombies.length; j++) {
            if (i !== j) {
                zombies[i].checkdistance(user);
            }
        }
    });
}

function updateBullets() {
    bullets.forEach(function (bullet, index) {
        bullet.display();
        bullet.move();
        if (bullet.checkForImpact(zombies)) {
            bullets.splice(index, 1);
            score++;

        }
        if (!bullet.stillOnScreen()) {
            bullets.splice(index, 1);
        }
    });
}

function resetEverything() {
    if (tick > 60) {
        tick = 0;
    }
    userPressedKey = false;
}

function displayAmmoAndReload() {
    textSize(20);
    fill(255);
    text("Ammo " + user.gun.ammo, 10, 30);
    if (user.gun.ammo === 0) {
        textSize(32);
        text("RELOAD ", window.innerWidth / 2 - 64, window.innerHeight / 2);
    }
}

function displayScore() {
    textSize(24);
    text("Score " + score, window.innerWidth - 100, window.innerHeight - 20);
}

function newRandomGun() {
    let random = Math.round(Math.random(0, 1));
    x = Math.floor((Math.random() * window.innerWidth) + 1);
    y = Math.floor((Math.random() * window.innerHeight) + 1);
    switch (random) {
        case 0:
            return new Gun(x, y);
            break;
        case 1:
            return new MachineGun(x, y);
            break;
    }

}