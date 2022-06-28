<main>
	<div class="grid h-screen place-items-center bg-[url('../src/lib/test_bg.jpg')]">
		{#if authStatus.isLoggedIn}
			<p>Welcome {authStatus.userData.uid}!</p>
		{:else}
			<LoginPage/>
	{/if }
	</div>
</main>


<script>
	import LoginPage from "./LoginPage.svelte"
	import { app } from "../Firebase.js";
	import { authStatus } from "../authStatus.js";
</script>

