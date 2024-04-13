export class Clock {
	constructor() {
		this.ticks = 0;
		this._startTime = Date.now();
		this._latestUpdate = this._startTime;
	}

	update() {
		this._latestUpdate = Date.now();
		this.ticks = this._startTime - this._latestUpdate;
	}

	get dt() {
		return Date.now() - this._latestUpdate;
	}
}

export const Timer_Type = {
	Oneshot: 1,
	Looping: 2
}

export class Timer {
	constructor(time = 1000, callback = () => {}, type = Timer_Type.Oneshot) {
		this._time = time;
		this._callback = callback;
		this._type = type;
		this._updTime = 100;

		this._passed = 0;
		this._timeout = undefined;
	}

	start() {
		this._timeout = setInterval(() => {
			this._passed += this._updTime;

			if (this._passed >= this._time) {
				if (this._type == Timer_Type.Oneshot) {
					clearInterval(this._timeout);
				} else {
					this._passed = 0;
				}
				this._callback();
			}
		}, this._updTime);
	}
}
