import { channelSplitMaterial } from './materials';

import { createBlotterComponent } from './createBlotterComponent';

export const SplitColorChannelText = createBlotterComponent({
  material: channelSplitMaterial,
  defaultProps: {
    id: 'channel-split-component',
    text: 'Hello World',
    fontFamily: 'sans-serif',
    fontSize: 45,
    fontWeight: 400,
    rotation: 0.0,
    rgbOffset: 0.05,
    fill: '#4f4f4f',
    fontStyle: 'normal',
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    lineHeight: 1.5
  },
  displayName: 'SplitColorChannel',
  setMaterialValues: (material, props) => {
    material.uniforms.uOffset.value = parseFloat(props.rgbOffset);
    material.uniforms.uRotation.value = parseFloat(props.rotation);
    material.uniforms.uApplyBlur.value = props.addBlur ? 1.0 : 0.0;
    material.uniforms.uAnimateNoise.value = props.addNoise ? 1.0 : 0.0;
  }
});
