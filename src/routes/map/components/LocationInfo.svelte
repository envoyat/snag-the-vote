<script lang="ts">
  import { isAPIDivision, type APIDataItem } from '../../../types/apiData';

  interface Props {
    attributes: APIDataItem | null
  }

  let { attributes: item }: Props = $props();
</script>

<div class="p-4">
  {#if item}
    {#if isAPIDivision(item)}
      <h1 class="text-xl font-bold">{item.name}</h1>
      <div>{item.currentMember.givenName} {item.currentMember.surname} ({item.currentMember.party})</div>
      <h2 class="text-l font-bold mt-2">Candidates</h2>
      <ul class="list-inside list-disc">
        {#each item.candidates as candidate}
          <li>{candidate.surname}, {candidate.givenName}: {candidate.party}</li>
        {/each}
      </ul>
    {:else}
      <h1 class="text-xl font-bold">{item.pollingPlace.locationName}</h1>
      <h3 class="">{item.pollingPlace.address1}, {item.pollingPlace.suburb} {item.pollingPlace.postCode}</h3>

      <div>SNAGS: {item.pollingPlace.snagData ? (item.pollingPlace.snagData.votePercent * 100) : 0}%</div>

      <h2 class="text-l font-bold mt-2">Candidates</h2>
      <ul class="list-inside list-disc">
        {#each item.division.candidates as candidate}
          <li>{candidate.surname}, {candidate.givenName}: {candidate.party}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<style>

</style>
