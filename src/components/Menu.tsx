import { slide as Menu } from 'react-burger-menu'

const SiteMenu = () => {
	const showSettings = (e) => {
		e.preventDefault()
		alert('SETTING Clicked')
	}


	const styles = {
		bmBurgerButton: {
			position: 'fixed',
			width: '36px',
			height: '30px',
			left: '36px',
			top: '36px',
			color: '#ffffff'
		},
		bmBurgerBars: {
			background: '#373a47'
		},
		bmBurgerBarsHover: {
			background: '#a90000'
		},
		bmCrossButton: {
			height: '24px',
			width: '24px'
		},
		bmCross: {
			background: '#bdc3c7'
		},
		bmMenuWrap: {
			position: 'fixed',
			height: '100%'
		},
		bmMenu: {
			background: '#373a47',
			padding: '2.5em 1.5em 0',
			fontSize: '1.15em'
		},
		bmMorphShape: {
			fill: '#373a47'
		},
		bmItemList: {
			color: '#b8b7ad',
			padding: '0.8em'
		},
		bmItem: {
			display: 'block'
		},
		bmOverlay: {
			background: 'rgba(0, 0, 0, 0.3)'
		}
	}
	// NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
	return (
		<Menu styles={styles}>
			<a id="home" className="menu-item text-white" href="/">Home</a>
			<a id="about" className="menu-item text-white" href="/workout">Workouts</a>
			<a id="contact" className="menu-item text-white" href="/calendar">Calendar</a>
			<a id="cardio" className="menu-item text-white" href="/cardio">Cardio</a>
			<a onClick={showSettings} className="menu-item--small text-white" href="">Settings</a>
		</Menu>
	)
}

export default SiteMenu

