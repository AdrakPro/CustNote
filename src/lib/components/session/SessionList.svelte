<script>
	import { sessions } from '$lib/stores/session.js';

	$: list = Object.values($sessions);
</script>
<ol class="list">
	{#each list as { name }}
		<li>{ name }</li>
	{/each}
</ol>

<style lang="scss">
  .list {
    counter-reset: list;
    display: inline-block;
    list-style: none;
    margin: $s-20;

    li {
      counter-increment: list;

      &::before {
        content: counter(list) ')';
        padding-right: $s-6;
      }

      &:first-child {
        color: $blue;
        font-weight: bold;
      }
    }
  }
</style>