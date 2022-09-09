<script lang="ts">
	export let name: string;
</script>

<li><span>{ name }</span></li>

<style lang="scss">
  li {
    cursor: pointer;
    font-size: $fs-18;
    font-weight: $fw-bold;

    &::before {
      content: '»';
      margin-right: $s-6;
      font-size: $fs-24;
      color: $blue;
    }

    &:hover {
      opacity: $base-opacity;
      transition: opacity 250ms ease-in-out;
    }
  }
</style>