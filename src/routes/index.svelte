<script>
	import { app } from "../Firebase.js";
	import Home from "./Home.svelte"
	import {getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
	import {authState} from "rxfire/auth";
  import { filter } from 'rxjs/operators';

	let email = "email@email.com";
	let password = "password";
  let user;
  
  const auth = getAuth();
  const unsubscribe = authState(auth).subscribe(u => user = u);

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

</script>

<main>
	<div class="grid h-screen place-items-center bg-[url('../src/lib/test_bg.jpg')]">
	{#if user}
		<Home/>
	{:else}
		<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
				Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="name@email.com" bind:value={email}>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" bind:value={password}>
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <button on:click={handleSignIn(email,password)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
			<a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="https://wikipedia.com">
        Forgot Password?
      </a>
		</div>
		
		<div class="mb-4">
			<label class="block text-gray-700 text-sm mb-2" for="SignUp"> No account yet? No worries!</label>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
				Sign Up
			</button>
		</div>

  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2022 Mikhail Sharov
  </p>
</div>

	{/if }
	</div>
</main>


