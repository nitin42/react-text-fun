import { createBlotterComponent } from './createBlotterComponent';
import { distortionText } from './materials';

export const DistortionText = createBlotterComponent({
  material: distortionText,
  defaultProps: {
    id: 'distortion-text-component',
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
    speed: 0.084,
    rotation: 120.0,
    distortX: 0.06,
    distortY: 0.09,
    noiseAmplitude: 0.101,
    noiseVolatility: 8
  },
  setMaterialValues: (material, props) => {
    material.uniforms.uNoiseDistortVolatility.value = props.noiseVolatility;
    material.uniforms.uNoiseDistortAmplitude.value = props.noiseAmplitude;
    material.uniforms.uDistortPosition.value = [props.distortX, props.distortY];
    material.uniforms.uRotation.value = props.rotation;
    material.uniforms.uSpeed.value = props.speed;
    material.uniforms.uSineDistortSpread.value = 0;
    material.uniforms.uSineDistortCycleCount.value = 0;
    material.uniforms.uSineDistortAmplitude.value = 0;
  },
  displayName: 'DistortionText'
});
