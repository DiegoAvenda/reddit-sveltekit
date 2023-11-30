<script>
  export let title
  export let content
  export let author
  export let likes
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{content}</p>
    <p>Author: {author}</p>
    <p>likes: {likes}</p>
  </div>
</div>
