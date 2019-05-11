WORK IN PROGRESS! COME BACK WHEN ITS DONE 😅

# react-text-fun

> React meets Blotter.js

<p align="center">
  <img src="./assets/demo.gif" />
</p>

## Table of contents

* [Introduction](#introduction)

* [Install](#install)

* [Example](#example)

* [Components](#blotter-components)

* [Styling text](#styling-text)

* [Using text canvas](#using-text-canvas)

## Introdution

`react-text-fun` is a small component library that encapsulates Blotter.js shader materials in the form of React components and provides a very easy to use API.

I created `react-text-fun` after finding myself imperatively using the Blotter.js APIs for custom and existing materials. I decided to convert all its shader materials in the form of React components to make it easier to work with. Hope you find it useful as well 🙂

## Install

Just put this script in your HTML file and we are all set go 🚀

```
<script src="https://unpkg.com/blotterjs-fork@0.1.0/build/blotter.min.js"></script>
```

> Note: Currently, you won't be able to install `react-text-fun` via npm since it uses Blotter.js and it currently can't be consumed via npm 😞. If you're interested in trying out and helping their team to publish the library, feel free to check out [this issue](https://github.com/bradley/Blotter/issues/18) otherwise let's jump to some interesting stuff 😍

## Example

Let's take an example of distortion text material that distorts the shape of the text using various transforms

```jsx
import { DistortionText } from 'react-text-fun'
import React from 'react';
import ReactDOM from 'react-dom';

const App = props => (
  <div>
    <DistortionText text="Hello wold" />
  </div>
)

// Assuming you have an element with id 'root' to which you want the component to render to.
ReactDOM.render(<App />, document.getElementById('root'))
```

If you've followed the installation instructions carefully, you should see this output.

<p align="center">
  <img src="./assets/distortion-text.gif" />
</p>

Cool, isn't it?

[Check out the API reference]() for `DistortionText` component to see what other effects you can apply to the text.

## Blotter components

### Distortion Text

Distortion text is based on the [Rolling Distort Material](https://blotter.js.org/#/materials/RollingDistortMaterial) in Blotter.js. 

**Example**

```jsx
import { DistortionText } from 'react-text-fun'

<DistortionText
  speed={1.5}
  rotation={45.0}
  distortX={4.9}
  distortY={6.5}
  noiseAmplitude={0.8}
  noiseVolatility={1.2}
/>
```

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `speed`     | Increase or decrease the speed of animation applied to the distortion on your text | number |
| `rotation`     | Change the rotation of distortion effect      |  number |
| `distortX` | update the horizontal position in which the distortion effect will be applied      |    number |
| `distortY` | update the vertical position in which the distortion effect will be applied      |    number |
| `noiseAmplitude` | change the noise amplitude (amplitude of toughs and crests)     |    number |
| `noiseVolatility` | describes the overall change your text will experience     |    number |

While it's a good practice to change the values of these props and see the result, I'll still recommend reading [this]() brilliant piece written by [Josh Comeau](https://www.joshwcomeau.com/) on [Waveforms](https://pudding.cool/2018/02/waveforms/). It will give you a little more idea on how and what values you should use to update the noise amplitude and its volatility.

### Flies Text

Flies Text component is based on the [FliesMaterial](https://blotter.js.org/#/materials/FliesMaterial) in Blotter.js

```jsx
import { FliesText } from 'react-text-fun';

<FliesText
  cellRadius={0.5}
  cellWidth={0.012}
  speed={2}
  dodge={true}
  dodgeY={0.35}
  dodgeSpread={3.5}
/>
```

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `cellWidth`     | Width of a cell | number |
| `cellRadius`     | Radius of a cell  |  number |
| `speed` | Animation speed    |    number |
| `dodge` | whether or not to dodge cells from a position (x-axis or y-axis)     |    boolean |
| `dodgeX` | dodge position of cells around x-axis    |    number |
| `dodgeY` | dodge position of cells around y-axis   |    number |

Try the examples to get more idea about dodging the cells. Change the values for `dodgeX` and  `dodgeY`, and see if you can create some interesting effects 😉

### Split color channel

Split color channel is based on [ChannelSplitMaterial](https://blotter.js.org/#/materials/ChannelSplitMaterial) in Blotter.js

```jsx
import { SplitColorChannelText } from 'react-text-fun';

<SplitColorChannelText
  rotation={85.0}
  rgbOffset={2.8}
  addBlur={false}
  addNoise={true}
/>
```

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `rotation`     | Change the angle of rgb channel splitting | number |
| `rgbOffset`     | Describes the distance apart the RGB values should spread  |  number |
| `addBlur` | Add blur to the text    |    boolean |
| `addNoise` | Add noise distortion to text     |    boolean |

### Liquid distortion text

```jsx
import { LiquidDistortionText } from 'react-text-fun';

<LiquidDistortionText
  speed={0.6}
  volatility={2.4}
/>
```

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `speed`     | Speed of the animation | number |
| `volatility`     | Describes the change in distortion of a text  |  number |

## Styling text

You can use the below props with any of the above component to style the text. These are the common props.

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `id`     | An unique id for the canvas | string |
| `appendTo`     | Specify an id for an element to which the canvas should be appended | string |
| `text`     | Text string to render |  string |
| `fontFamily`     | Set a different font type | string |
| `fontSize`     | Set the font size |  number |
| `fontWeight`     | Set the font weight | number |
| `fill`     | Sets the text color |  string |
| `fontStyle`     | Specify a font style (italic, normal or bold) | string |
| `lineHeight`     | Set the line height |  number |
| `paddingTop`     | Apply top padding | number |
| `paddingBottom`     | Apply bottom padding |  number |
| `paddingLeft`     | Apply padding on left side | number |
| `paddingRight`     | Apply padding on right side |  number |

## Using text canvas

You can also access the canvas which renders the text using the callback function `get2dContext`. As the prop name suggests, the callback function receives the 2D rendering context for the drawing surface as an argument. This is useful if you want to update the canvas using any other third party library.

`get2dContext` can be used with any of the above material components. For instance, here is an example of how you would use it with `FliesText` component.

```jsx
<FliesText {...props} get2dContext={ctx => console.log(ctx)} />
```