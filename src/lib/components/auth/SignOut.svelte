<script>
	import Icon from '../Icon.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase.ts';

	async function signOut() {
		await auth.signOut();
		await fetch('/api/signOut.json', {
			method: 'POST',
			headers: new Headers({ 'content-type': 'application/json' }),
			credentials: 'same-origin',
		});
		await goto('/auth');
	}
</script>

<li on:click={ signOut }>
	<Icon
		src="icons/signOut.png"
		width="36"
		height="36"
	/>
</li>