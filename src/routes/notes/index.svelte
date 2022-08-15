<script context="module">
	export async function load({ fetch }) {
		const authRes = await fetch('/api/auth.json');

		if (!authRes.ok) {
			return { status: 302, redirect: '/auth' };
		}
		const auth = await authRes.json();
		return {
			props: {
				user: auth.user,
				customToken: auth.customToken
			}
		};
	}
</script>