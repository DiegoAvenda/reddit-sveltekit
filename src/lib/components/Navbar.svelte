<script>
	export let imagen;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Home</a>
		<a href="/posts" class="btn btn-ghost text-xl">Posts</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src={imagen} alt="profile" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a class="justify-between" href="/bio">
						Bio
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/signup">signup</a></li>
				<li>
					<form method="POST" action="/?/logout">
						<button>Logout</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>
