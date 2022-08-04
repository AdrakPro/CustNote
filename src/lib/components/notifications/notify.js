import { derived, writable } from 'svelte/store';
// TODO CLEAN UP
function createNotificationStore() {
	const notifications = writable([]);

	function send(message, type, timeout) {
		notifications.update((state) => [...state, { id: id(), type, message, timeout }]);
	}

	const { subscribe } = derived(notifications, ($notifications, set) => {
		set($notifications);
		if ($notifications.length > 0) {
			const timer = setTimeout(() => {
				notifications.update((state) => {
					state.shift();

					return state;
				});
			}, $notifications[0].timeout);
			return () => clearTimeout(timer);
		}
	});

	return {
		subscribe,
		danger: (msg, timeout) => send(msg, 'danger', timeout),
		warning: (msg, timeout) => send(msg, 'warning', timeout),
		info: (msg, timeout) => send(msg, 'info', timeout),
		success: (msg, timeout) => send(msg, 'success', timeout),
	};
}

function id() {
	return '_' + Math.random().toString(36).substring(2, 9);
}

export const notify = createNotificationStore();