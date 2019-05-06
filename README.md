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