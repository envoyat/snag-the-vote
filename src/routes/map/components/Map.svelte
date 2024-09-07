<script lang="ts">
  import '@arcgis/core/assets/esri/themes/light/main.css';
  import Modal from '$lib/components/UI/Modal.svelte';
  import MapView from '@arcgis/core/views/MapView';
  import WebMap from '@arcgis/core/WebMap';
  import LocationInfo from './LocationInfo.svelte';

  const WEBMAP_ID = '88d2b75f8cd24ec0bbfc0d75c906e83b';

  let isModalOpen = $state(false);
  const openModal = () => isModalOpen = true;
  const closeModal = () => isModalOpen = false;

  let selectedAttributes: Record<string, string> = $state({});

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
        openModal();
      }
    });

    return {
      destroy() {
        view.destroy();
      }
    };
  }
</script>

<div class="h-full">
  <div id="map-div" use:createMap></div>
</div>

<Modal
  title={selectedAttributes?.DivisionNm || 'Info'}
  isOpen={isModalOpen}
  onClose={closeModal}
>
  <LocationInfo attributes={selectedAttributes} />
</Modal>

<style>
  #map-div {
    width: 100%;
    height: 90%;
  }
</style>
