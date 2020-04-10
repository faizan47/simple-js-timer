// fetchPlanets().then(printPlanets).catch((err) => console.log(err));
// .call() calls the function for another object as individual arguments
// .apply() calls the function for another object as individual arguments
// .bind() with this, you can store another function into a variable with an obj and pass arguments to the variable to call the function
class Timer {
	constructor(startBtn, pauseBtn, timerInput, notifier) {
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;
		this.timerInput = timerInput;
		this.onStart = notifier.onStart;
		this.onPause = notifier.onPause;
		this.onTick = notifier.onTick;
		this.startBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
		timerInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') this.start();
		});
	}
	start = () => {
		if (this.onStart) this.onStart(this.timerInput.value);
		// this.tick();
		this.timerId = setInterval(this.tick, 50);
	};
	pause = () => {
		if (this.onPause) this.onPause();
		clearInterval(this.timerId);
	};
	get timeRemaining() {
		return parseFloat(this.timerInput.value);
	}
	set timeRemaining(time) {
		this.timerInput.value = time.toFixed(2);
	}
	tick = () => {
		const timeRemaining = this.timeRemaining;
		if (timeRemaining > 0) {
			this.timeRemaining = timeRemaining - 0.05;
			if (this.onTick) this.onTick(this.timerInput.value);
		} else {
			this.pause();
		}
	};
}

let startButton = document.querySelector('#start');
let pauseButton = document.querySelector('#stop');
let timerInput = document.querySelector('#duration');
let circle = document.querySelector('circle');
let perimeter = 2 * Math.PI * circle.getAttribute('r');
let totalTime;
let currentOffset = 0;
circle.setAttribute('stroke-dasharray', perimeter);
let countdown = new Timer(startButton, pauseButton, timerInput, {
	onStart(totalDuration) {
		totalTime = totalDuration;
		console.log('Timer started', totalTime);
	},
	onPause() {
		console.log('Timer has been paused.');
	},
	onTick(timeRemaining) {
		console.log(timeRemaining / totalTime, 'totalTime');
		// console.log(timeRemaining, 'timeRemaining');
		// currentOffset = circle.getAttribute('stroke-dashoffset');
		// circle.setAttribute('stroke-dashoffset', -1 * timeRemaining / totalTime);
		circle.setAttribute('stroke-dashoffset', timeRemaining / totalTime);
		circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / totalTime - perimeter);
	}
});

// p = 942.47
// seconds = 30
