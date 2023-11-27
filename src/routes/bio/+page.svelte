<script>
	import Card from '$lib/components/Card.svelte';
	export let data;
	export let form;
</script>

<p>Welcome {data.userPosts.name}</p>
<br />

<form method="POST" action="?/editBio">
	<input placeholder="Edit Name" type="text" name="name" />
	<button type="submit" class="btn">Edit</button>
</form>
<br />

<p>Posts: {data.userPosts.posts?.length}</p>

{#each data.userPosts.posts as userPost}
	<Card
		id={userPost.id}
		title={userPost.title}
		content={userPost.content}
		author={userPost.author}
	/>

	<form method="POST" action="?/editPost">
		{#if form?.missing} <p>Both fields are required</p>{/if}
		<input type="hidden" name="id" value={userPost.id} />
		<input type="text" name="title" id="title" placeholder="Title" />
		<input type="text" name="content" placeholder="Content" />
		<button type="submit" class="btn btn-primary">Edit</button>
		<button formaction="?/delete" class="btn">Delete</button>
	</form>
{/each}
