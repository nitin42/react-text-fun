import React from 'react';
import { hasBlotterInstance } from './hasBlotterInstance';

// A high order component that creates a blotter text component using the input parameters
export const createBlotterComponent = ({
  // A material is a function that returns a shader string and uniforms to update the effects
  material,
  // setMaterialValues is a function that takes a shader material and input props, and updates the materials with those props
  // This is invoked on first mount and subsequent state updates
  setMaterialValues,
  // Default props of the component
  defaultProps,
  // Component's display name (useful for debugging)
  displayName
}) => {
  class BlotterComponent extends React.Component {
    material = null;

    static displayName = displayName;

    static defaultProps = defaultProps;

    componentDidMount() {
      // Check if the blotter instance is initiated otherwise throw an error
      hasBlotterInstance();

      // TODO: Publish a private fork of Blotter with customised build setup
      const BlotterInstance = window.Blotter;

      // Each material function returns an object which includes a shader string and uniforms to update the effects in shader
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

      // On first mount, set the material values (this is optional)
      setMaterialValues(this.material, this.props);
    }

    componentDidUpdate() {
      // Update the shader material with new values (or uniforms)
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
