<script>
  import SignOut from '../auth/SignOut.svelte';
</script>

<nav>
  <ul>
    <li><a href="/notes">Notes</a></li>
    <li><a href="#">Calendar</a></li>
    <li><a href="#">Session Timer</a></li>
    <li class="settings"><a href="#">Settings</a></li>
    <SignOut />
  </ul>
</nav>

<style>
	.settings {
		margin: 0 1em 0 auto;
	}
</style>