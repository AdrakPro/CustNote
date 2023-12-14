<script>
  import Icon from '../Icon.svelte';
  import { signOut } from '$lib/firebase/firebase.js';
</script>

<li on:click={() => signOut()}>
  <Icon name="logout" style="cursor: pointer;" />
</li>
