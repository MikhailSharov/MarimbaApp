<script>
	let hello = 'Hello World';

	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

	const auth = getAuth();
	const user = auth.currentUser;

	let uid = user.uid;

	function handleSignOut(val) {
		if (val == true) {
			signOut(auth)
				.then(() => {
					console.log('Signed Out');
				})
				.catch((error) => {});
		}
	}
</script>

<div>
	<p>Hello {uid}!</p>
	<button on:click={() => handleSignOut(true)} type="button">Log Out</button>
</div>
