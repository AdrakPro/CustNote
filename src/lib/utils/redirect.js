import { goto } from '$app/navigation';
import { dialog } from '$lib/stores/dialog.js';

export function redirectTo(path) {
  goto(path);
  dialog.close();
}
