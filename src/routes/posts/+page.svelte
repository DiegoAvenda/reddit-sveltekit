<script>
	export let data;
	import Card from '$lib/components/Card.svelte';
</script>

{#each data.feed as post}
	<a href="/posts/{post.id}"
		><Card id={post.id} title={post.title} content={post.content} author={post.author.name} /></a
	>
	<form method="POST" action="/?/createComment">
		<input type="hidden" name="postId" value={post.id} />
		<input type="text" name="comment" placeholder="Leave a comment" />
		<button type="submit" class="btn">comment</button>
		<button formaction="/?/like">Like</button>
		<button formaction="/?/dislike">Dislike</button>
	</form>
{/each}
