<script lang="ts">
  import { isElectoralDivision, type SelectionAttributes } from '../../../types/attributes';

  interface Props {
    attributes: SelectionAttributes
  }

  let { attributes: item }: Props = $props();
</script>

<div class="p-4">
  {#if isElectoralDivision(item)}
    <h1 class="text-xl font-bold">{item.elect_div}</h1>
    <p>{item.objectid}</p>
  {:else}
    <h1 class="text-xl font-bold">{item.DivisionNm}</h1>
    <h3 class="">{item.PremisesAddress1}, {item.PremisesSuburb} {item.PremisesPostCode}</h3>

    <h1>SNAGS</h1>
  {/if}
</div>

<style>

</style>
