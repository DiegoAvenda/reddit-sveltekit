<script>
  import Navbar from '$lib/components/Navbar.svelte'
  import '../app.css'
  export let data
</script>

<Navbar imagen={data.fotos} />
<slot />
