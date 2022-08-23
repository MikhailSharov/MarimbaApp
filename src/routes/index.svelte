<script>
	import { app } from '../Firebase.js';
	import Main from './Main.svelte';
	import LoginPage from './LoginPage.svelte';
	import {
		getAuth,
		signInWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
		browserSessionPersistence
	} from 'firebase/auth';
  // import { authState } from 'rxfire/auth';

	let email = 'email@email.com';
	let password = 'password';
	let user;

	const auth = getAuth();
  // const unsubscribe = authState(auth).subscribe((u) => (user = u));
  
  onAuthStateChanged(auth, (u) => {
    if (u) {
      user = u
    } else {
      console.log("signed out");
    }
  });

	function handleSignIn(email, password) {
		console.log('click');
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				alert(error.message);
			});
  }

  console.log(user);

</script>

<main>
	{#if user}
		<div class="grid h-screen">
			<Main />
		</div>
	{:else}
		<div class="grid h-screen place-items-center bg-[url('../src/lib/test_bg.jpg')]">
			<LoginPage />
		</div>
	{/if}
</main>
