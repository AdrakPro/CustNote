<script>
  export let width = 24;
  export let height = 24;
  export let src = '';
  export let name = '';
  export let onClick = () => {};
</script>

{#if !src}
  <span
    class="material-icons"
    style={$$props.style}
    on:click={onClick}
    {width}
    {height}
    >{name}
  </span>
{:else}
  <img
    {src}
    {width}
    {height}
    style={$$props.style}
    on:click={onClick}
    alt="icon"
  />
{/if}
