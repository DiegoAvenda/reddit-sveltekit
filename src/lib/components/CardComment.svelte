<script>
  export let message
  export let username
  export let likes
  export let commentId
  export let userId
  export let son
  export let nieto
</script>

<div class="card w-96 bg-gray-700 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{message}</h2>
    <p>author: {username}</p>
    <p>Likes: {likes}</p>
    <div class="card-actions justify-end">
      <form method="POST" action="/posts/[slug]?/comentarComentario">
        <button class="btn btn-primary" formaction="/posts/[slug]?/like"
          >Like</button
        >
        <button class="btn btn-primary" formaction="/posts/[slug]?/dislike"
          >Dislike</button
        >
        <br />
        <input type="hidden" name="parentId" value={commentId} />
        <input type="hidden" name="userId" value={userId} />
        <input type="text" name="message" placeholder="leave a comment" />
        <button class="btn btn-primary" type="submit">Send</button>
      </form>
      {#if son}
        <p>I am a son</p>
      {/if}
      {#if nieto}
        <p>I am a nieto</p>
      {/if}
    </div>
  </div>
</div>
