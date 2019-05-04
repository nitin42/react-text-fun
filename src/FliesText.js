import { fliesMaterial } from './materials';
import { createBlotterComponent } from './createBlotterComponent';

export const FliesText = createBlotterComponent({
  material: fliesMaterial,
  defaultProps: {
    cellWidth: 0.04,
    cellRadius: 0.5,
    speed: 2.0,
    dodge: false,
    dodgeX: 0.5,
    dodgeY: 0.8,
    dodgeSpread: 0.75
  },
  displayName: 'FliesText',
  setMaterialValues: (material, props) => {
    material.uniforms.uPointCellWidth.value = parseFloat(props.cellWidth);
    material.uniforms.uPointRadius.value = parseFloat(props.cellRadius);
    material.uniforms.uSpeed.value = parseFloat(props.speed);
    material.uniforms.uDodge.value = props.dodge ? 1.0 : 0.0;
    material.uniforms.uDodgePosition.value = [
      parseFloat(props.dodgeX),
      parseFloat(props.dodgeY)
    ];
    material.uniforms.uDodgeSpread.value = parseFloat(props.dodgeSpread);
  }
});
