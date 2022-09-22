<script lang="ts">
	import { modules } from '$lib/stores/modules.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { notify } from '$lib/stores/notify.js';
	import { del } from '$lib/api.js';
	import { goto } from '$app/navigation';

	const { userId, moduleName } = dialog.get().data;

	async function deleteModule() {
		await goto('/dashboard');
		modules.delete(moduleName);
		dialog.close();
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
      box-shadow: $base-shadow;
      cursor: pointer;
      margin: 0 $s-6;
      padding: 0 $s-6;
    }
  }
</style>