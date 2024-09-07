<script lang="ts">
  import '@arcgis/core/assets/esri/themes/light/main.css';
  import MapView from '@arcgis/core/views/MapView';
  import WebMap from '@arcgis/core/WebMap';

  const WEBMAP_ID = '88d2b75f8cd24ec0bbfc0d75c906e83b';

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

<style>
    #viewDiv {
        width: 100%;
        height: 100%;
    }
</style>
