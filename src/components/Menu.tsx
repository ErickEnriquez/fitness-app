import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'
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
			top: '8px',
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
		<div className='relative p-2'>
			<Menu customBurgerIcon={<HamburgerIcon />} width={'auto'} className='left-0 top-12' >
				<Links />
			</Menu>
		</div>
	)
}

const HamburgerIcon = () => (<div className='p-1/2'><svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></div>)

export const Links = () => (<>
	<Link href="/"><a className='font-bold p-4'>Home</a></Link>
	<Link href="/workout"><a className='font-bold p-4'>Workouts</a></Link>
	<Link href="/calendar"><a className='font-bold p-4'>Calendar</a></Link>
	<Link href="/cardio"><a className='font-bold p-4'>Cardio</a></Link>

</>)


export default SiteMenu

