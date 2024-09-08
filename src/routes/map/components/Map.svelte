<script lang="ts">
  import '@arcgis/core/assets/esri/themes/light/main.css';
  import Modal from '$lib/components/UI/Modal.svelte';
  import MapView from '@arcgis/core/views/MapView';
  import WebMap from '@arcgis/core/WebMap';
  import LocationInfo from './LocationInfo.svelte';
  import { isElectoralDivision, type SelectionAttributes } from '../../../types/attributes';
  import type { APIDataItem, DivisonAndPollingPlaceData, DivsionWithMemberAndCandidates } from '../../../types/apiData';

  const WEBMAP_ID = '88d2b75f8cd24ec0bbfc0d75c906e83b';

  let isModalOpen = $state(false);
  const openModal = () => isModalOpen = true;
  const closeModal = () => isModalOpen = false;

  let selectedAttributes: SelectionAttributes = $state({}) as SelectionAttributes;

  let isLoadingApiData = $state(false);
  let apiData: APIDataItem | null = $state(null) as APIDataItem | null;

  function createMap(node: HTMLDivElement) {
    const webMap = new WebMap({
      portalItem: {
        id: WEBMAP_ID,
      }
    });

    const view = new MapView({
      container: node,
      map: webMap,
    });

    view.on('click', async (event) => {
      const { results } = await view.hitTest(event);
      if (results.length) {
        console.log('mapPoint', event.mapPoint);

        const graphic = results.find(result => result.type === 'graphic');
        selectedAttributes = graphic?.graphic.attributes;
        await loadLocationDataAndOpenModal();
      }
    });

    return {
      destroy() {
        view.destroy();
      }
    };
  }

  const loadLocationDataAndOpenModal = async () => {
    isLoadingApiData = true;
    apiData = null;

    openModal();

    if (isElectoralDivision(selectedAttributes)) {
      const divisionDataRequest = await fetch(`/data/divisions?divisionName=${selectedAttributes.elect_div}`);
      const divisionDataText = await divisionDataRequest.text();
      const divisionData = JSON.parse(divisionDataText) as DivsionWithMemberAndCandidates;
      apiData = divisionData;
    } else {
      const pollingPlaceDataRequest = await fetch(`/data/polling-places?pollingPlaceId=${selectedAttributes.PollingPlaceID}`);
      const pollingPlaceDataText = await pollingPlaceDataRequest.text();
      const pollingPlaceData = JSON.parse(pollingPlaceDataText) as DivisonAndPollingPlaceData;
      apiData = pollingPlaceData;
    }

    isLoadingApiData = false;
  }
</script>

<div class="flex flex-col h-full">
  <div class="flex-grow" use:createMap></div>
</div>

<Modal isOpen={isModalOpen} onClose={closeModal}>
  {#if isLoadingApiData}
    <p>Loading...</p>
  {:else}
    <LocationInfo attributes={apiData} />
  {/if}
</Modal>

<style>

</style>
