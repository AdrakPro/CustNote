<script>
  import { modules } from '$lib/stores/modules.js';
  import Module from '$lib/components/dashboard/Module.svelte';
</script>

{#each $modules as { name, lastEdit } (name)}
  <Module {name} {lastEdit} />
{/each}
