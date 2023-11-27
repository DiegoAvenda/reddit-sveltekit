<script>
	import Card from '$lib/components/Card.svelte';
	export let data;
</script>

<div class="card w-96 bg-primary text-primary-content">
	<div class="card-body">
		<h2 class="card-title">{data.comments[0].post.title}</h2>
		<p>{data.comments[0].post.content}</p>
		<p>{data.comments[0].post.author}</p>
	</div>
</div>

{#each data.comments as comment}
	<Card author={comment.user.name} likes={comment.likes.length} title={comment.message} />
	<form method="POST" action="?/comentarComentario">
		<div class="card-actions">
			<button class="btn btn-primary" formaction="?/like">Like</button>
			<button class="btn btn-primary" formaction="?/dislike">Dislike</button> <br />
			<input type="hidden" name="parentId" value={comment.id} />
			<input type="hidden" name="userId" value={comment.userId} />
			<input type="text" name="message" placeholder="leave a comment" />
			<button class="btn" type="submit">Send</button>
		</div>
	</form>
	{#if comment.children}
		{#each comment.children as kid}
			<div class="card w-96 bg-neutral text-neutral-content">
				<div class="card-body items-center text-center">
					<p>{kid.message}</p>
					<p>I am a kid</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Accept</button>
						<button class="btn btn-ghost">Deny</button>
					</div>
				</div>
			</div>
		{/each}
	{/if}
{/each}
