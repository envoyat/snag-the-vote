<script lang="ts">
  import { isAPIDivision, type APIDataItem, type DivsionWithMemberAndCandidates, type PollingPlaceWithSnagData } from '$lib/dataProvider';
  import { onMount } from 'svelte';
  import { isElectoralDivision, type SelectionAttributes } from '../../../types/attributes';

  interface Props {
    attributes: SelectionAttributes
  }

  let { attributes: item }: Props = $props();

  let isLoadingApiData = $state(false);
  let apiData: APIDataItem = $state({}) as APIDataItem;

  onMount(async () => {
    isLoadingApiData = true;

    if (isElectoralDivision(item)) {
      const divisionDataRequest = await fetch(`/api/divisions?divisionName=${item.elect_div}`);
      const divisionDataText = await divisionDataRequest.text();
      const divisionData = JSON.parse(divisionDataText) as DivsionWithMemberAndCandidates;
      console.log('divisionData', divisionData);
      apiData = divisionData;
    } else {
      const pollingPlaceDataRequest = await fetch(`/api/polling-places?pollingPlaceId=${item.PollingPlaceID}`);
      const pollingPlaceDataText = await pollingPlaceDataRequest.text();
      const pollingPlaceData = JSON.parse(pollingPlaceDataText) as PollingPlaceWithSnagData;
      console.log('polingPlaceData', pollingPlaceData);
      apiData = pollingPlaceData;
    }

    isLoadingApiData = false;
  })
</script>

<div class="p-4">
  {#if isLoadingApiData}
    <p>Loading...</p>
  {:else}
    {#if isAPIDivision(apiData)}
      <h1 class="text-xl font-bold">{apiData.name}</h1>
      <p>{apiData.currentMember.party}</p>
    {:else}
      <h1 class="text-xl font-bold">{apiData.name}</h1>
      <h3 class="">{apiData.address1}, {apiData.suburb} {apiData.postCode}</h3>

      <h1>SNAGS: {apiData.snagData && apiData.snagData.votePercent}%</h1>
    {/if}
  {/if}
</div>

<style>

</style>
