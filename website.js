import styled from '@emotion/styled'
import React from 'react'
import ReactDOM from 'react-dom'
import useMobileDetect from 'use-mobile-detect-hook'

import { SplitColorChannelText, FliesText, LiquidDistortionText, DistortionText } from './src'

const COLOR = '#2f2f2f'

const Container = styled.div`
	font-family: -apple-system, system-ui, BlinkMacSystemFont;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: ${props => props.direction};
	margin-top: ${props => props.top};

	#description {
		color: ${COLOR};
		font-size: 1.4rem;
		margin-bottom: 80px;

		a {
			text-decoration: none;
			border-bottom: 2px solid;
			color: inherit;
		}
	}

	.footer-container {
		margin-top: 30px;
	}

	footer {
		font-size: 1.4rem;
		color: inherit;

		a {
			text-decoration: none;
			border-bottom: 2px solid;
			color: inherit;
		}
	}

	@media only screen and (max-width: 1024px) {
		#description {
			font-size: 0.9rem;
			margin-left: 5px;
			margin-top: 20px;
			margin-bottom: 30px;
			line-height: 1.3rem;
		}

		footer {
			font-size: 1rem;
		}
	}
`

const LinkButton = styled.a`
	text-decoration: none;
	padding: 1rem;
	border: 4px solid ${COLOR};
	font-size: 1.2rem;
	color: ${COLOR};
	font-weigth: bold;
	transition: background 0.1s;
	border-radius: 5px;

	&:hover {
		background-color: ${COLOR};
		color: white;
	}

	@media only screen and (max-width: 1024px) {
		font-size: 0.9rem;
		padding: 0.5rem;
		border-width: 2px;
		border-radius: 3px;
	}
`

const Footer = props => (
	<footer style={{ marginTop: 5 }}>
		<p>
			Made with &#9829; by <a href="http://ntsketches.in">Nitin Tulswani</a>
		</p>
	</footer>
)

const App = props => {
	const detectMobile = useMobileDetect()
	const [value, setValue] = React.useState(0)
	const [width, setWidth] = React.useState()

	const ref = React.createRef()

	React.useEffect(() => {
		const { width } = ref.current.getBoundingClientRect()

		setWidth(width)
	})

	const updateShader = e => {
		if (!detectMobile.isMobile()) {
			setValue(e.clientX)
		}
	}

	return (
		<Container top="50px" direction="column" ref={ref} onMouseMove={updateShader}>
			<div id="split-color">
				<SplitColorChannelText
					appendTo="split-color"
					text="React Text Fun"
					fontSize={detectMobile.isMobile() ? 50 : 220}
					rotation={0.8}
					rgbOffset={value === 0 ? 0.095 : value / 10000}
					addBlur={false}
					addNoise={true}
				/>
			</div>
			<div id="description">
				A small component library that encapsulates <a href="https://blotter.js.org/#/materials">Blotter.js</a> shader
				materials in the form of React components and provides a very easy to use API.
			</div>
			<div>
				<LinkButton href="https://github.com/nitin42/react-text-fun#table-of-contents" aria-label="documentation">
					Documentation
				</LinkButton>
			</div>
			<div className="footer-container">
				<Footer />
			</div>
		</Container>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
