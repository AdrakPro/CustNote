<script>
  import SignOut from '../auth/SignOut.svelte';
</script>

<nav>
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="#">Calendar</a></li>
    <li><a href="#">Session Timer</a></li>
    <li style="margin: 0 1em 0 auto"><a href="#">Settings</a></li>
    <SignOut />
  </ul>
</nav>