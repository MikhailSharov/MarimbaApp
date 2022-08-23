<script>
	import {
		getAuth,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword
	} from 'firebase/auth';
	import { app } from '../Firebase.js';
	import { getDatabase, ref, get, child, set } from 'firebase/database';
	import { scale } from 'svelte/transition';

	let email = '';
	let password = '';
	let username = '';

	let isOpen = false;

	const auth = getAuth();
	const db = getDatabase();

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

	function handleSignUp(username, email, password) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;

				set(ref(db, 'users/' + user.uid), {
					username: username,
					email: email,
					friendreqs: ['defaultReq'],
					friends: ['defaultFriend'],
					verified: "FALSE"
				})

			})
			.catch((error) => {
				alert(error.message);
		});
	}

	function handleModal() {
		isOpen = !isOpen;
	}
</script>

<div class="w-full max-w-xs">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
				type="email"
				placeholder="name@email.com"
				bind:value={email}
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
			<input
				class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password"
				type="password"
				placeholder="******************"
				bind:value={password}
			/>
			<p class="text-red-500 text-xs italic">Please enter a password</p>
		</div>
		<div class="flex items-center justify-between mb-4">
			<button
				on:click={handleSignIn(email, password)}
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
			>
				Sign In
			</button>
			<a
				class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				href="https://wikipedia.com"
			>
				Forgot Password?
			</a>
		</div>

		<div class="mb-4">
			<label class="block text-gray-700 text-sm mb-2" for="SignUp">
				No account yet? No worries!</label
			>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={() => handleModal()}
			>
				Sign Up
			</button>
		</div>
	</form>
	<p class="text-center text-gray-500 text-xs">&copy;2022 Mikhail Sharov</p>
</div>

{#if isOpen}
	<div
		id="signUp-modal"
		tabindex="-1"
		class=" absolute grid h-screen overflow-y-auto overflow-x-hidden fixed place-items-center z-50 w-full"
	>
		<div class="relative p-4 w-full max-w-md h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow" transition:scale>
				<button
					type="button"
					class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-cente"
					on:click={() => handleModal()}
				>
					<svg
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
				<div class="py-6 px-6 lg:px-8">
					<h3 class="mb-4 text-xl font-medium text-gray-900">Register for Marimba!</h3>
					<div>
						<div class="pb-3">
							<label for="usernameModal" class="block mb-2 text-sm font-medium text-gray-900"
								>Your Username</label
							>
							<input
								type="username"
								name="usernameModal"
								id="usernameModal"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pb-3"
								bind:value={username}
								required
								placeholder="username"
							/>
						</div>

						<div class="pb-3">
							<label for="emailModal" class="block mb-2 text-sm font-medium text-gray-900"
								>Your Email</label
							>
							<input
								type="email"
								name="emailModal"
								id="emailModal"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pb-3"
								bind:value={email}
								required
								placeholder="name@email.com"
							/>
						</div>
						<div class="pb-3">
							<label for="passwordModal" class="block mb-2 text-sm font-medium text-gray-900"
								>Your Password</label
							>
							<input
								type="password"
								name="passwordModal"
								id="passwordModal"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pb-3"
								bind:value={password}
								required
								placeholder="*************"
							/>
						</div>
						<button
							type="submit"
							class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							on:click={() => handleSignUp(username, email, password)}>Sign Up</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
