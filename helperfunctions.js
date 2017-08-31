function checkPosition(selfObject) {
    if(selfObject.x < selfObject.spriteWidth) {
        selfObject.x = selfObject.spriteWidth;
    }
    if(selfObject.x > (width - selfObject.spriteWidth ) ) {
        selfObject.x = (width - selfObject.spriteWidth );
    }
    if(selfObject.y < ( selfObject.spriteHeight ) ) {
        selfObject.y = selfObject.spriteHeight;
    }
    if(selfObject.y > (height - selfObject.spriteHeight ) ) {
        selfObject.y = (height - selfObject.spriteHeight );
    }
}
function is_user_being_eaten(user ,zombies) {
    zombies.forEach(function(zombie, index) {
        if (zombie.x < user.x + user.diameter &&
            zombie.x + zombie.diameter > user.x &&
            zombie.y < user.y + user.diameter &&
            zombie.diameter + zombie.y > user.y) {
            // collision detected!
            return true;
        }
    });
}