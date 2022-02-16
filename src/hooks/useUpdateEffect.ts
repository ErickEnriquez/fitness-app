import { useEffect, useRef } from 'react'

export const useUpdateEffect = (callback, dependencies) => {

	const firstRender = useRef(true)
	//just runs the callback if we are not in the first render

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}
		return callback()
	}, dependencies)
	
}