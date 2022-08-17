<script>
	let modules = [
		{
			title: 'Geometria analityczna',
			lastEdit: 'Wektory 27/3/22'
		}
	];
</script>

{#each modules as { title, lastEdit }}
  <div class="module">
    <h1 class="title">{ title }</h1>
    <p class="sub-text">Last edit: { lastEdit }</p>
  </div>
{/each}

<style lang="scss">
	.module {
		border: 4px $blue solid;
		border-left: 3px $blue solid;
		border-radius: $base-radius;
		border-top: 3px $blue solid;
		box-shadow: $base-shadow;
		cursor: pointer;
		height: 160px;
		margin: 1rem;
		max-width: 430px;
		min-width: 290px;
		padding: 1rem;

		.title {
			font-size: 2rem;
			font-weight: $fw-semibold;
			padding-bottom: 2em;
			text-align: center;
		}

		.sub-text {
			font-weight: $fw-light;
			text-align: end;
		}
	}
</style>