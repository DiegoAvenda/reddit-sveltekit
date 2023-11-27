<script>
	export let form;
</script>

<h1>Sign up</h1>

<form method="POST" action="?/OAuth2">
	<button type="submit"> Sign in with google </button>
</form>

<br />

<form method="POST" action="?/email">
	<label for="email">
		email
		<input id="email" type="text" name="email" />
	</label>
	<label for="password">
		password
		<input id="password" type="password" name="password" />
	</label>
	<button type="submit">Sign up</button>
</form>
