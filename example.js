import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

import { SplitColorChannelText } from './src';

import 'react-input-range/lib/css/index.css';

const App = props => {
  const [value, setValue] = React.useState(10);

  return (
    <div id='app'>
      <SplitColorChannelText
        text='Nitin Tulswani'
        rotation={(value * 8.5) / 8}
        rgbOffset={value / 100}
        blur={true}
        appendTo='app'
        get2dContext={ctx => console.log(ctx)}
      />
      <InputRange
        maxValue={100}
        minValue={0}
        value={value}
        onChange={val => setValue(val)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
