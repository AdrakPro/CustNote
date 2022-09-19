<script>
	import WelcomeNav from '$lib/components/nav/WelcomeNav.svelte';
	import NotesNav from '$lib/components/nav/NotesNav.svelte';
	import { page } from '$app/stores';
	import '$styles/nav.scss';

	export let isOpenMenu = false;

	async function getNavBar() {
		const currentPathName = $page.url.pathname;
		let navBar;

		switch (currentPathName) {
			case '/':
				navBar = WelcomeNav;
				break;
			case '/dashboard':
				navBar = NotesNav;
				break;
		}

		return navBar;
	}
</script>

<input
	id="toggle-menu"
	class="toggle-menu"
	bind:checked={ isOpenMenu }
	type="checkbox"
>
{#await getNavBar() then component}
	<svelte:component this="{ component }" />
{/await}
<label
	class="toggle-menu-label"
	for="toggle-menu"
>
	<span></span>
</label>

<style lang="scss">
  /* TOGGLE MENU BUTTON */
  /* Allow menu button to be taggable */
  .toggle-menu {
    left: -9999px;
    position: absolute;
    top: -9999px;
  }

  /* Todo - Add circle instead of outline */
  .toggle-menu:focus-visible ~ .toggle-menu-label {
    margin-top: 1px;
    outline: 1px solid $white;
  }

  .toggle-menu-label {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 100%;
    margin-right: 1em;
    position: absolute;
    right: 0;
    top: 0;
  }

  .toggle-menu-label span,
  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    background-color: $white;
    border-radius: 2px;
    display: block;
    height: 2px;
    position: relative;
    width: 27px;
  }

  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    content: '';
    position: absolute;
  }

  .toggle-menu-label span::before {
    bottom: 7px;
  }

  .toggle-menu-label span::after {
    top: 7px;
  }

  /* TODO CLOSE MENU BUTTON */
  /* RESPONSIVE STYLE WHEN SCREEN EXCEEDS 900PX */
  @media screen and (min-width: $bh-mobile) {
    .toggle-menu-label {
      display: none;
    }
  }
</style>