<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    title?: string;
    isOpen: boolean;
    onClose: () => void;
  }

  let { children, title, isOpen, onClose }: Props = $props();

</script>

<dialog id="the-modal" class="modal" class:modal-open={isOpen}>
  <div class="modal-box max-w-full mx-4 my-6 overflow-hidden">
    {#if title}
      <h3 class="text-lg font-bold">{title}</h3>
    {/if}

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
