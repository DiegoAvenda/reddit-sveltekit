<script>
  export let data
  import CardComment from '../../../lib/components/CardComment.svelte'
</script>

<div class="card w-96 bg-primary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">{data.comments[0].post.title}</h2>
    <p>{data.comments[0].post.content}</p>
    <p>Author: {data.comments[0].post.author.name}</p>
  </div>
</div>

{#each data.comments as comment}
  <div class="static mt-10 m-2">
    <CardComment
      message={comment.message}
      username={comment.user.name}
      likes={comment.likes.length}
      commentId={comment.id}
      userId={comment.userId}
    />

    {#if comment.children}
      {#each comment.children as son}
        <div class="relative mb-4 left-10 top-4">
          <CardComment
            class=""
            son={true}
            message={son.message}
            username={son.user.name}
            likes={son.likes.length}
            commentId={son.id}
            userId={son.userId}
          />
        </div>
        <!--
      {#if kid.children}
        {#each kid.children as nieto}
          <CardComment
            message={nieto.message}
            username={nieto.user.name}
            likes={nieto.likes.length}
            commentId={nieto.id}
            userId={nieto.userId}
          />
        {/each}
      {/if}
  -->
      {/each}
    {/if}
  </div>
{/each}
