<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/db/firebase.ts';
	import Icon from '../view/Icon.svelte';

	async function signOut() {
		await auth.signOut();
		await fetch('/api/signOut.json', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin'
		});
		await goto('/auth');
	}
</script>

<li on:click={ signOut }>
  <Icon height="36" src="icons/signOut.png" width="36" />
</li>