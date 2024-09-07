<script>
    import '../app.css';
    import BottomNav from '$lib/components/UI/BottomNav.svelte';
    import Navbar from '$lib/components/UI/Navbar.svelte';
</script>

<div class="flex flex-col min-h-screen max-h-screen h-screen overflow-auto">
  <Navbar />

  <main class="flex-grow pb-12">
    <slot></slot>
  </main>

  <BottomNav />
</div>

<style>

</style>
