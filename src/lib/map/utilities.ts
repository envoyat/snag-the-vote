import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

// See filter example at https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=featureeffect-drop-shadow
export function applyFilter(layerView: FeatureLayerView, field: string) {
  const featureFilter = new FeatureFilter({
    where: `${field}='R' OR ${field}='D'`,
  });

  layerView.featureEffect = new FeatureEffect({
    filter: featureFilter,
    includedEffect: [
      {
        scale: 36978595,
        value: 'drop-shadow(3px, 3px, 4px)',
      },
      {
        scale: 18489297,
        value: 'drop-shadow(2px, 2px, 3px)',
      },
      {
        scale: 4622324,
        value: 'drop-shadow(1px, 1px, 2px)',
      },
    ],
  });
}
