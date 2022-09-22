import { get, writable } from 'svelte/store';
import { notify } from '$lib/stores/notify.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

function createSessionStore() {
	const sessions = writable([]);
	const { subscribe, update, set } = sessions;

	return {
		subscribe,
		add: (time, name) =>
			update((sessions) => {
				return [
					...sessions,
					{
						time: time * MINUTE,
						name,
					},
				];
			}),
		shift: () => {
			let shiftedSession;

			update((sessions) => {
				shiftedSession = sessions.shift();

				return sessions;
			});

			return shiftedSession;
		},
		getTotalTime: () => get(sessions).reduce((n, { time }) => n + time, 0),
		setCompletionTimes: () =>
			update((sessions) => {
				for (let i = 1; i < sessions.length; ++i) {
					// Sum previous time with next
					sessions[i].time = sessions[i - 1].time + sessions[i].time;
				}

				return sessions;
			}),
		isEmpty: () => get(sessions).length === 0,
		reset: () => set([]),
	};
}

export const sessions = createSessionStore();
export const isRunning = writable(false);
export const isComplete = writable(true);
export const time = writable('0:0:0');
export const progress = writable(0);

function createTimerStore() {
	let totalTime;
	let timer;
	let timeSpent = 0;
	let currentProgress = 0;

	const updateTimer = () => {
		let seconds = (totalTime - timeSpent) / SECOND;
		// 3,600 seconds in 1 hour
		const hours = Math.floor(seconds / 3600);
		// Seconds remaining after extracting hours
		seconds %= 3600;
		// 60 seconds in 1 minute
		const minutes = Math.floor(seconds / 60);
		// Keep only seconds not extracted to minutes:
		seconds %= 60;

		currentProgress = timeSpent / totalTime;
		progress.set(currentProgress);
		time.set(`${hours}:${minutes}:${seconds}`);
	};

	const incrementTime = () => (timeSpent += SECOND);

	const stopTimer = () => {
		clearInterval(timer);
		progress.set(0);
		timeSpent = 0;
		sessions.reset();
		time.set('0:0:0');
		isComplete.set(true);
		isRunning.set(false);
	};

	const isSessionEnded = () => {
		if (currentProgress === 1) {
			stopTimer();
			notify.success(`All sessions have been completed! ᕕ(ᐛ)ᕗ`);

			return;
		}

		const { time } = get(sessions)[0];

		if (time === timeSpent) {
			const { name } = sessions.shift();

			if (name === 'break') {
				notify.danger(`The ${name} has been ended! ʕ•ᴥ•ʔ`);

				return;
			}
			notify.info(`The session ${name} has been completed! (~‾▿‾)~`);
		}
	};

	return {
		start: () => {
			isComplete.set(false);
			isRunning.set(true);

			totalTime = sessions.getTotalTime();
			sessions.setCompletionTimes();

			timer = setInterval(() => {
				if (get(isRunning)) {
					incrementTime();
					updateTimer();
					isSessionEnded();
				}
			}, SECOND);
		},
		stop: () => stopTimer(),
		switchPause: () => {
			isRunning.set(!get(isRunning));
		},
	};
}

export const timer = createTimerStore();
