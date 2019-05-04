import React from 'react';

import { channelSplitMaterial } from './materials';

import { hasBlotterInstance } from './hasBlotterInstance';

export class SplitColorChannelText extends React.Component {
  material = null;

  componentDidMount() {
    // Check if the blotter instance is initiated. If not, throw an error
    hasBlotterInstance();

    // TODO: publish a private fork of Blotter.js and remove this dependency
    const BlotterInstance = window.Blotter;

    // Create a text object with style properties
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
      style: this.props.fontStyle
    });

    const { shader, uniforms } = channelSplitMaterial(BlotterInstance);

    this.material = new BlotterInstance.ShaderMaterial(shader, {
      uniforms
    });

    const blotter = new Blotter(this.material, {
      texts: text
    });

    const textObj = blotter.forText(text);

    // Append the text canvas to a user defined element id or wrapper id
    this.props.appendTo && typeof this.props.appendTo === 'string'
      ? this.appendText(textObj, this.props.appendTo)
      : this.appendText(textObj, this.props.id);

    // Invoke the prop callback with rendering context. Useful if you want to update the canvas with other third party libs.
    this.props.get2dContext && typeof this.props.get2dContext === 'function'
      ? this.props.get2dContext(textObj.context)
      : null;

    this.updateMaterial();
  }

  componentDidUpdate() {
    // Update the material with new props
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
    this.material.uniforms.uOffset.value = parseFloat(this.props.rgbOffset);
    this.material.uniforms.uRotation.value = parseFloat(this.props.rotation);
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
  rotation: 0.0,
  rgbOffset: 0.05,
  fill: '#4f4f4f',
  fontStyle: 'normal',
  paddingBottom: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingLeft: 0,
  lineHeight: 1.5
};
