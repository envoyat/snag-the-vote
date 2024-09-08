<script lang="ts">
  import '@arcgis/core/assets/esri/themes/light/main.css';
  import Modal from '$lib/components/UI/Modal.svelte';
  import MapView from '@arcgis/core/views/MapView';
  import WebMap from '@arcgis/core/WebMap';
  import {
    type APIDataItem,
    type DivisionAndPollingPlaceData,
    type DivisionWithMemberAndCandidates,
    isAPIDivision,
  } from '../../../types/apiData';
  import { isElectoralDivision, type SelectionAttributes } from '../../../types/attributes';
  import CandidateCarousel from './CandidateCarousel.svelte';
  import LocationInfo from './LocationInfo.svelte';

  const WEBMAP_ID = '88d2b75f8cd24ec0bbfc0d75c906e83b';

  let selected: SelectionAttributes | null = $state(null);
  let apiData: APIDataItem | null = $state(null);
  let isLoadingApiData = $state(false);
  let isModalOpen = $state(false);

  const openModal = () => isModalOpen = true;
  const closeModal = () => isModalOpen = false;

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
        selected = graphic?.graphic.attributes;

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
    if (!selected) {
      return;
    }
    isLoadingApiData = true;
    apiData = null;

    openModal();

    if (isElectoralDivision(selected)) {
      const divisionDataRequest = await fetch(`/data/divisions?divisionName=${selected.elect_div}`);
      apiData = await divisionDataRequest.json() as DivisionWithMemberAndCandidates;
    } else {
      const pollingPlaceDataRequest = await fetch(`/data/polling-places?pollingPlaceId=${selected.PollingPlaceID}`);
      apiData = await pollingPlaceDataRequest.json() as DivisionAndPollingPlaceData;
    }

    isLoadingApiData = false;
  }
</script>

<div class="flex flex-col h-full">
  <div class="flex-grow" use:createMap></div>
</div>

<Modal isOpen={isModalOpen} onClose={closeModal}>
  {#if selected}
    {#if isLoadingApiData}
      <span class="loading ball loading-lg mx-auto"></span>
    {:else}
      <LocationInfo attributes={apiData} />

      {#if apiData && isModalOpen}
        <CandidateCarousel data={isAPIDivision(apiData) ? apiData : apiData.division} />
      {/if}
    {/if}
  {/if}
</Modal>

<style>

</style>
