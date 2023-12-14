<script>
  import Icon from '../Icon.svelte';

  export let isLoginForm = true;

  $: getText = () => (isLoginForm ? 'LOG IN' : 'SIGN UP');
</script>

<button class="google-button">
  <Icon height="28" src="icons/google.png" width="28" />
  <span>{getText()} WITH GOOGLE</span>
</button>

<style lang="scss">
  .google-button {
    align-items: center;
    background-color: $blue;
    border-radius: $base-radius;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 0 1rem 0.2rem 1rem;
    width: 90%;

    &:hover {
      background-color: rgba($blue, $base-opacity);
      transition: background-color 250ms ease-in-out;
    }

    span {
      color: $white;
      font-size: $fs-14;
      font-weight: $fw-bold;
      padding-left: $s-6;
    }
  }
</style>
