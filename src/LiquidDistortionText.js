import { createBlotterComponent } from './createBlotterComponent';
import { liquidDistortionMaterial } from './materials';

export const LiquidDistortionText = createBlotterComponent({
  defaultProps: {
    id: 'liquid-distortion-component',
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
    lineHeight: 1.5,
    speed: 1.5,
    volatility: 0.04
  },
  displayName: 'LiquidDistortionText',
  setMaterialValues: (material, props) => {
    material.uniforms.uSpeed.value = parseFloat(props.speed);
    material.uniforms.uVolatility.value = parseFloat(props.volatility);
  },
  material: liquidDistortionMaterial
});
