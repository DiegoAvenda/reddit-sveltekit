<script>
	export let data;
	import Card from '$lib/components/Card.svelte';
</script>

<form method="POST" action="?/createPost">
	<input class="input w-full max-w-xs" id="title" type="text" name="title" placeholder="Title" />
	<input
		class="input w-full max-w-xs"
		id="content"
		type="text"
		name="content"
		placeholder="Content"
	/>
	<button class="btn" type="submit">send</button>
</form>

{#each data.feed as post}
	<Card id={post.id} title={post.title} content={post.content} author={post.author.name} />
{/each}
