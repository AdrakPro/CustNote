<script>
	export let open = true;
	export let placement = 'left';
</script>

<aside
	class="drawer"
	class:open
>
	<div class="panel { placement }">
		<slot />
	</div>
</aside>

<style lang="scss">
  .drawer {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    transition: z-index 350ms step-end;
    z-index: $back-z-index;

    &.open {
      transition: z-index 350ms step-start;
      z-index: 20;

      .panel {
        transform: translate(0, 0);
      }
    }
  }

  .panel {
    border-right: 3px $blue solid;
    box-shadow: $base-shadow;
    height: 100%;
    overflow: hidden;
    overflow-wrap: break-word;
    position: fixed;
    transition: transform 350ms ease;
    width: 300px;
    background: linear-gradient(140deg, #43484d, #46484b, #484848);

    &.right {
      right: 0;
      transform: translate(100%, 0);
    }

    &.left {
      left: 0;
      transform: translate(-100%, 0);
    }
  }
</style>