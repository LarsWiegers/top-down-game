class Zombie extends BaseClass {
    constructor(x, y, direction, sprite, spriteWidth, spriteHeight) {
        super(x, y, direction, sprite, spriteWidth, spriteHeight);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.diameter = 40;
        this.maxspeed = random(4.5, 5.5);
        this.maxforce = 0.2;
        this.xoff = random(0, 1200); // noise offset value for wandering angle
        this.isWandering = true; // boolean value to toggle wandering behavior on/off
        this.isZombie = true; // boolean value to toggle wandering behavior on/off
        this.alertRange = 700; // zombies smell their prey
        this.infectionRage = 10; // ouch! if you get this close you get infected
        this.r = 6;
        this.timer = new Timer(2000); // how log does it takes to become a zombie after being infected?
    }

    seek(target) {
        let desired = p5.Vector.sub(target.pos, this.pos);
        desired.setMag(this.maxspeed);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxforce);
        this.applyForce(steering);
    };

    // Separation
    separate(zombies) {
        let desiredseparation = this.r * 6;
        let sum = createVector();
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < zombies.length; i++) {
            let d = p5.Vector.dist(this.pos, zombies[i].pos);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.pos, zombies[i].pos);
                diff.normalize();
                diff.div(d); // Weight by distance
                sum.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxspeed);
            // Implement Reynolds: Steering = Desired - Velocity
            let steer = p5.Vector.sub(sum, this.vel);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    };

    checkdistance(otherVehicle) { // here we switch behaviours based on vehicle's proximity
        let desired = p5.Vector.sub(otherVehicle.pos, this.pos);
        let d = desired.mag();
        if (!this.isDead && !this.isZombie && otherVehicle.isZombie) {
            if (d < this.infectionRage) {
                print("I got you");
                this.isDead = true;
                this.timer.start();
            } else if (d < this.alertRange) {
                otherVehicle.isWandering = false;
                otherVehicle.seek(this);
                this.isWandering = false;
                this.flee(otherVehicle);
            } else {
                //this.isWandering = true;
            }
        }
    };

    wander() {
        let noisyangle = map(noise(this.xoff), 0, 1, 0, TWO_PI);
        let wandering = p5.Vector.fromAngle(noisyangle);
        wandering.setMag(this.maxspeed * 0.2);
        let steering = p5.Vector.sub(wandering, this.vel);
        steering.limit(this.maxforce);
        this.applyForce(steering);
        this.xoff += 0.005;
    };

    applyForce(force) {
        this.acc.add(force);
    };

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        if (this.isDead) {
            if (this.timer.checkTime()) {
                //println("time is finished");
                this.isZombie = true;
                counter++;
                this.isDead = false;
                println(counter);
            }
        }
    };

    displayZombie() {
        image(this.sprite,this.pos.x,this.pos.y,32,48,(this.spritePosition * this.spriteWidth),(this.direction * this.spriteHeight),    this.spriteWidth,this.spriteHeight);
    };
    wrapAround() {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }
    run() {
        this.update();
        this.displayZombie();
        this.wrapAround();

        if (this.isWandering) {
            this.wander();
            this.maxspeed = 4.8;
        } else {
            this.maxspeed = 5;
        }

    }
    isInReachForUser(user) {
        const self = this;
            if(
                self.pos.x-(self.diameter/2 )>user.pos.x &&
                self.pos.x+(self.diameter/2 )<user.pos.x+user.spriteWidth &&
                self.pos.y-(self.diameter/2 )>user.pos.y &&
                self.pos.y+(self.diameter/2 )<user.pos.y+user.spriteHeight
            ){
                console.log("dead");
                return true;

            }
        return false;

    }
}





















