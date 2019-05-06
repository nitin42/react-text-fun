WORK IN PROGRESS! COME BACK WHEN ITS DONE 😅

# react-text-fun

> React meets Blotter.js

## Table of contents

* [Introduction](#introduction)

* [Install](#install)

* [Example](#example)

* [Components](#components)

* [API reference]()

### Introdution

`react-text-fun` is a small component library that encapsulates Blotter.js shader materials in the form of React components and provides a very easy to use API.

I created `react-text-fun` after finding myself imperatively using the Blotter.js APIs for custom and existing materials. I decided to convert all its shader materials in the form of React components to make it easier to work with. Hope you find it useful as well 🙂

### Install

Just put this script in your HTML file and we are all set go 🚀

```
<script src="https://unpkg.com/blotterjs-fork@0.1.0/build/blotter.min.js"></script>
```

> Note: Currently, you won't be able to install `react-text-fun` via npm since it uses Blotter.js and it currently can't be consumed via npm 😞. If you're interested in trying out and helping their team to publish the library, feel free to check out [this issue](https://github.com/bradley/Blotter/issues/18) otherwise let's jump to some interesting stuff 😍

### Example

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

### Blotter components

#### Distortion Text

Distortion text is based on the [Rolling Distort Material](https://blotter.js.org/#/materials/RollingDistortMaterial) from Blotter.js. 

| Prop        | Description           | Type  |
| ------------- |:-------------:| -----:|
| `speed`     | Increase or decrease the speed of animation applied to the distortion on your text | number |
| `rotation`     | Change the rotation of distortion effect      |  number |
| `distortX` | update the horizontal position in which the distortion effect will be applied      |    number |
| `distortY` | update the vertical position in which the distortion effect will be applied      |    number |
| `noiseAmplitude` | change the noise amplitude (amplitude of toughs and crests)     |    number |
| `noiseVolatility` | describes the overall change your text will experience     |    number |

While it's a good practice to change the values of these props and see the result, I'll still recommend reading [this]() brilliant piece written by [Josh Comeau](https://www.joshwcomeau.com/) on [Waveforms](https://pudding.cool/2018/02/waveforms/). It will give you a little more idea on how and what values you should use to update the noise amplitude and its volatility.
