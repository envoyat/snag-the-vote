<script lang="ts">
  interface Props {
    attributes: Record<string, string>;
  }

  let { attributes }: Props = $props();
</script>

<div class="p-4">
  <div class="mt-4">
    <ul>
      {#each Object.entries(attributes) as [key, value]}
        <li>
          <strong>{key}:</strong> {value}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>

</style>
