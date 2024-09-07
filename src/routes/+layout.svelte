<script>
    import '../app.css';
    import BottomNav from '$lib/components/UI/BottomNav.svelte';
    import Navbar from '$lib/components/UI/Navbar.svelte';
</script>

<Navbar />

<main class="">
  <slot></slot>
</main>

<BottomNav />

<style>

</style>
