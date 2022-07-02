<script>
	import { getAuth, signOut } from 'firebase/auth';

	const auth = getAuth();
	const user = auth.currentUser;

	let uid = user.uid;

	function handleSignOut(val) {
		if (val == true) {
			signOut(auth)
				.then(() => {
          console.log('Signed Out');
          location.reload()
				})
				.catch((error) => {});
		}
	}
</script>

<div>
	<p>Hello {uid}!</p>
	<button on:click={() => handleSignOut(true)} type="button">Log Out</button>
</div>
