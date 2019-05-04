import React from 'react';

import { channelSplitMaterial } from './materials';

import { hasBlotterInstance } from './hasBlotterInstance';

export class SplitColorChannelText extends React.Component {
  material = null;

  componentDidMount() {
    hasBlotterInstance();

    const BlotterInstance = window.Blotter;

    const text = new BlotterInstance.Text(this.props.text, {
      family: this.props.fontFamily,
      size: this.props.fontSize,
      fill: this.props.fill,
      paddingLeft: this.props.paddingLeft,
      paddingRight: this.props.paddingRight,
      paddingBottom: this.props.paddingBottom,
      paddingTop: this.props.paddingTop,
      leading: this.props.lineHeight,
      weight: this.props.fontWeight,
      style: this.props.textStyle
    });

    const { shader, uniforms } = channelSplitMaterial(BlotterInstance);

    this.material = new BlotterInstance.ShaderMaterial(shader, {
      uniforms
    });

    const blotter = new Blotter(this.material, {
      texts: text
    });

    const textObj = blotter.forText(text);

    this.props.appendTo && typeof this.props.appendTo === 'string'
      ? this.appendText(textObj, this.props.appendTo)
      : this.appendText(textObj, this.props.id);

    this.props.get2dContext && typeof this.props.get2dContext === 'function'
      ? this.props.get2dContext(textObj.context)
      : null;

    this.updateMaterial();
  }

  componentDidUpdate() {
    this.updateMaterial();
  }

  appendText = (textObj, id) => {
    const element = document.getElementById(id);

    if (element) {
      textObj.appendTo(element);
    } else {
      console.error(`Couldn't find an element with id '${id}'.`);
    }
  };

  updateMaterial = () => {
    this.material.uniforms.uOffset.value = this.props.rgbOffset;
    this.material.uniforms.uRotation.value = this.props.rotation;
    this.material.uniforms.uApplyBlur.value = this.props.addBlur ? 1.0 : 0.0;
    this.material.uniforms.uAnimateNoise.value = this.props.addNoise
      ? 1.0
      : 0.0;
  };

  render() {
    if (this.props.appendTo) return null;

    return <div id={this.props.id} style={this.props.wrapperStyles} />;
  }
}

SplitColorChannelText.defaultProps = {
  id: 'channel-split-component',
  text: 'Hello World',
  fontFamily: 'sans-serif',
  fontSize: 45,
  fontWeight: 400,
  fill: '#4f4f4f',
  textStyle: 'normal',
  paddingBottom: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingLeft: 0,
  lineHeight: 1.5
};
