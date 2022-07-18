import { slide as Menu } from 'react-burger-menu'
import NavLinks from '@components/NavLinks'

const SiteMenu = () => {

	const styles = {
		bmBurgerButton: {
			position: 'fixed',
			width: '36px',
			height: '30px',
			left: '36px',
			top: '36px',
		},
		bmBurgerBars: {
			background: '#ffffff',
			borderRadius: '5px'
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
			padding: '0.8em',
		},
		bmItem: {
			display: 'inline-block'
		},
		bmOverlay: {
			background: 'rgba(0, 0, 0, 0.9)'
		},
	}
	// NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
	return (
		<div className='relative p-2'>
			<Menu customBurgerIcon={<HamburgerIcon />} style={styles} width={'auto'} className='left-0 top-12' >
				<NavLinks />
			</Menu>
		</div>
	)
}

const HamburgerIcon = () => (
	<div className='p-1/2'>
		<svg
			className="w-8 h-8 text-white"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path d="M4 6h16M4 12h16M4 18h16">
			</path>
		</svg>
	</div>
)




export default SiteMenu

