<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, title, isOpen, onClose }: {
    children: Snippet;
    title: string;
    isOpen: boolean;
    onClose: () => void;
  } = $props();

</script>

<dialog id="the-modal" class="modal" class:modal-open={isOpen}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">{title}</h3>

    {@render children()}

    <div class="modal-action">
      <form method="dialog">
        <button class="btn" onclick="{onClose}">Close</button>
      </form>
    </div>
  </div>
</dialog>

<style>

</style>
