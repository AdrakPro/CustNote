<script lang="ts">
	import { auth } from '$lib/db/firebase';
	import { signOut } from 'firebase/auth';

	function logOut() {
		signOut(auth).then(() => {
			localStorage.removeItem('uid');
		}).catch((e) => console.log(e));
	}
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/" on:click={ () => logOut() }>Log out</a></li>
  </ul>
</nav>