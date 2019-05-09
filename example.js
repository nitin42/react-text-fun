import React from 'react'
import ReactDOM from 'react-dom'
import InputRange from 'react-input-range'

import { SplitColorChannelText, FliesText, LiquidDistortionText, DistortionText } from './src'

import 'react-input-range/lib/css/index.css'

const App = props => {
	const [value, setValue] = React.useState(50)

	return (
		<div id="app">
			<FliesText
				appendTo="app"
				text="ReactTextFun"
				fontSize={220}
				paddingLeft={80}
				fontWeigh="bold"
				fontWeight="bold"
				fill="pink"
				cellRadius={value / 50}
				cellWidth={0.012}
				speed={2}
				dodge={true}
				dodgeY={0.35}
				dodgeSpread={value / 220}
				get2dContext={ctx => console.log(ctx)}
			/>
			<InputRange maxValue={100} minValue={0} value={value} onChange={val => setValue(val)} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
