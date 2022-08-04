<script lang="ts">
	import { auth } from '$lib/db/firebase';
	import { signOut } from 'firebase/auth';

	function signOutUser() {
		signOut(auth).then(() => {
			localStorage.removeItem('uid');
		}).catch((e) => console.log(e));
	}
</script>

<li><a href="/" on:click={ () => signOutUser() }>Log out</a></li>