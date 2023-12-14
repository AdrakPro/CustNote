import { derived, writable } from 'svelte/store';

function createNotificationStore() {
  const notifications = writable([]);
  const BASE_TIMEOUT = 3.5 * 1000;

  function send(message, type) {
    notifications.update((state) => {
      // Prevent spamming
      if (type === 'danger' && state.length > 0) {
        return [...state];
      }

      return [
        ...state,
        { id: id(), type, message, timeout: BASE_TIMEOUT }
      ];
    });
  }

  const { subscribe } = derived(
    notifications,
    ($notifications, set) => {
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
    }
  );

  return {
    subscribe,
    danger: (msg) => send(msg, 'danger'),
    warning: (msg) => send(msg, 'warning'),
    info: (msg) => send(msg, 'info'),
    success: (msg) => send(msg, 'success')
  };
}

function id() {
  return crypto.randomUUID();
}

export const notify = createNotificationStore();
