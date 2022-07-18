import Link from 'next/link'
import { useRouter } from 'next/router'
const NavLinks = () => {
	return (
		<>
			<NavLink url={'/'} name={'Home'} />
			<NavLink url={'/workout'} name={'Workouts'} />
			<NavLink url={'/calendar'} name={'Calendar'} />
			<NavLink url={'/cardio'} name={'Cardio'} />
		</>
	)
}

const NavLink = ({ url, name }: { url: string, name: string }) => {
	const router = useRouter()
	return (
		<Link href={url}>
		<a className={`font-bold p-4 flex flex-col rounded-xl hover:underline ${url === router.pathname ? 'bg-white text-cyan-700' : ''}`} >
			{name}
		</a>
	</Link>
	)
}

export default NavLinks
