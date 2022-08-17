<script>
	export let thickness = 10;
	export let position = 'absolute';
</script>

<div class="wave" style="position: { position };">
  <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,64L48,90.7C96,117,192,171,288,160C384,149,480,75,576,64C672,53,768,107,864,117.3C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
  <div class="wave-extension" style="height: { thickness + 'vh' }"></div>
</div>

<style lang="scss">
	.wave {
		bottom: 0;
		width: 100%;

		svg {
			display: block;
			fill: $blue;
			transform: translateY(1px);
		}

		// Hide wave when overflow content
		@media screen and (max-height: 600px) {
			display: none;
		}
	}

	.wave-extension {
		background-color: $blue;
	}
</style>