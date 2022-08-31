<script>
	import Icon from '../Icon.svelte';
	import { signOut } from '$lib/firebase/firebase.js';
</script>

<li on:click={ () => signOut() }>
	<Icon
		src="icons/signOut.png"
		width="36"
		height="36"
	/>
</li>