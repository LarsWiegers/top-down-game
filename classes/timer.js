class Timer {
    constructor(tempTotalTime){
        this.savedTime; // When timed started
        this.totalTime = tempTotalTime; // How long timer should last
    }


    //starting the timer
    start () {
        this.savedTime = millis();
    }

    checkTime() {
        // check how much time has passed
        let passedTime = millis() - this.savedTime;
        return passedTime > this.totalTime;
    }
}
