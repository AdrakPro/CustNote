<script lang="ts">
	import { modules } from '$lib/stores/modules.js';
	import { notes } from '$lib/stores/notes.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { notify } from '$lib/stores/notify.js';
	import { del } from '$lib/api.js';
	import { redirectTo } from '$lib/utils/redirect.js';

	const { userId, moduleName } = dialog.get().data;

	async function deleteModule() {
		await redirectTo('/dashboard');

		modules.delete(moduleName);
		notes.deleteMany(moduleName);

		const { ok } = await del(`/api/${userId}/module/${moduleName}`, userId);

		if (!ok) {
			notify.danger('Cannot delete module! Try again.');
		}
	}
</script>

<div class="dialog">
	<p>Are you sure to delete this module?</p>
	<button on:click={ () => deleteModule() }>Yes</button>
	<button on:click={ () => dialog.close() }>No</button>
</div>

<style lang="scss">
  .dialog {
    align-items: center;
    display: flex;

    // Yes button should be different than no (feature)
    button {
      border-radius: $base-radius;
      cursor: pointer;
      margin: 0 $s-6;
      padding: 0 $s-6;
    }
  }
</style>