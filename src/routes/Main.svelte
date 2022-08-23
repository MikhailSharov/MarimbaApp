<script>
	import { getAuth, signOut } from 'firebase/auth';
	import { getDatabase, ref, get, child, set, onValue, off } from 'firebase/database';

	const auth = getAuth();
	const user = auth.currentUser;

	const db = getDatabase();
	const dbref = ref(db);

	let uid = user.uid;

	var username = '';
	const usernameRef = ref(db, 'users/' + uid + '/username');

	onValue(usernameRef, (snapshot) => {
		username = snapshot.val();
		console.log(username)
	})

	alert(username);
	console.log(username);

	function checkUsername () {
		if (username == '') {
			setTimeout(checkUsername, 500);
		} else {
			off(usernameRef);
		}
	}

	checkUsername();

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

<body>
	<header>
	<nav aria-label="primary" class="sticky top-0 bg-yellow-100 w-full flex relative justify-between items-center mx-auto px-5 h-20">
    <!-- logo -->
		<div class="inline-flex">
			Hello {username}!
		</div>
		
		<div class="relative group w-48 text-right">
      <button type="button">
          <span>Dropdown Test</span>
      </button>
      <div class="absolute z-10 hidden bg-grey-200 group-hover:block w-48 text-left">
          <div class="px-2 pt-2 pb-4 bg-white bg-gray-200 shadow-lg">
						<button on:click={() => handleSignOut(true)} type="button" class="w-40 text-left">Log Out</button>
          </div>
      </div>
  	</div> 	

  		<!-- end logo -->
		</nav>
	</header>
	<main class="grid h-screen place-items-center"> 
		<div>
			<p>Hello {uid}!</p>
			<button on:click={() => handleSignOut(true)} type="button">Log Out</button>
		</div>
	</main>
</body>


