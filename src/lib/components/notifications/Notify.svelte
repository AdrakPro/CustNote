<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notify } from './notify.js';

	let themes = {
		danger: '#e26d69',
		success: '#84c991',
		warning: '#f0ad4e',
		info: '#5bc0de',
	};
</script>

<div class="notifications">
  {#each $notify as notification (notification.id)}
    <div
      animate:flip
      class="toast"
      style="background: { themes[notification.type] };"
      transition:fly={ { y: 15, duration: '1200' } }
    >
      <div class="content">{ notification.message }</div>
      <!--{#if notification.icon}<i class={notification.icon} />{/if}-->
    </div>
  {/each}
</div>

<style>
	.notifications {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		left: 0;
		margin: 0 auto;
		padding: 0;
		pointer-events: none;
		position: fixed;
		right: 0;
		top: 10px;
		z-index: 9999;
	}

	.toast {
		border-radius: 5px;
		flex: 0 0 auto;
		margin-bottom: 10px;
	}

	.content {
		color: white;
		display: block;
		font-weight: 500;
		padding: 10px;
	}
</style>
