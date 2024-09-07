<script lang="ts">
  import '@arcgis/core/assets/esri/themes/light/main.css';
  import MapView from '@arcgis/core/views/MapView';
  import WebMap from '@arcgis/core/WebMap';
  import LocationInfo from './LocationInfo.svelte';
  import Modal from './Modal.svelte';

  const WEBMAP_ID = '88d2b75f8cd24ec0bbfc0d75c906e83b';

  const openModal = () => {
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };

  let selectedAttributes: Record<string, string> | undefined = $state({});
  let isModalOpen = $state(false);

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

<div class="h-screen">
  <div id="viewDiv" use:createMap></div>
</div>

<Modal
  title={selectedAttributes?.DivisionNm || 'Info'}
  isOpen={isModalOpen}
  onClose={closeModal}
>
  <LocationInfo attributes={selectedAttributes} />
</Modal>

<style>
  #viewDiv {
    width: 100%;
    height: 90%;
  }
</style>
