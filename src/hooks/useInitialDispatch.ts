import { useEffect } from 'react'
import { useRouter } from 'next/router'

/**
 * runs an initial dispatch action, once we have the url query parameter
 * @param key the key that we will be using as input
 * @param action the dispatch action that we want to call
 */
export const useInitialDispatch = (key: string, action: (parameter: string) => void) => {
	const router = useRouter()
	useEffect(() => {
		const params = router.query
		if (params[key]) {
			const p = String(params[key])
			action(p)
		}
	}, [router.query])

}