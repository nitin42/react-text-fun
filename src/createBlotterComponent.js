import React from 'react';
import { hasBlotterInstance } from './hasBlotterInstance';

export const createBlotterComponent = ({
  material,
  setMaterialValues,
  defaultProps,
  displayName
}) => {
  class BlotterComponent extends React.Component {
    material = null;

    static displayName = displayName;

    static defaultProps = defaultProps;

    componentDidMount() {
      hasBlotterInstance();

      const BlotterInstance = window.Blotter;

      const { shader, uniforms } = material(BlotterInstance);

      this.material = new BlotterInstance.ShaderMaterial(shader, {
        uniforms
      });

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

      setMaterialValues(this.material, this.props);
    }

    componentDidUpdate() {
      setMaterialValues(this.material, this.props);
    }

    appendText = (textObj, id) => {
      const element = document.getElementById(id);

      if (element) {
        textObj.appendTo(element);
      } else {
        console.error(`Couldn't find an element with id '${id}'.`);
      }
    };

    render() {
      if (this.props.appendTo) return null;

      return <div id={this.props.id} style={this.props.wrapperStyles} />;
    }
  }

  return BlotterComponent;
};
