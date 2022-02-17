import { useState } from 'react'
import { useUpdateEffect } from '@hooks/useUpdateEffect'
import axios from 'axios'

export type TApiResponse = {
	status: number
	statusText: string
	data: any
	error: any
	loading: boolean
	setUrl:React.Dispatch<React.SetStateAction<string>>
}

export const useFetch = ({ uri }: {uri:string}): TApiResponse => {
	//initialize the states needed
	const [status, setStatus] = useState<number>(0)
	const [statusText, setStatusText] = useState<string>('')
	const [data, setData] = useState<any>()
	const [error, setError] = useState<any>()
	const [loading, setLoading] = useState<boolean>(false)
	const [url, setUrl] = useState<string>(uri)
	const getData = async () => { 
		setLoading(true)
		try {
			const apiResponse = await axios.get(url)
			const data = apiResponse.data
			setStatus(apiResponse.status)
			setStatusText(apiResponse.statusText)
			setData(data)
		} catch (err) {
			setError(err)
		}
		finally {
			setLoading(false)
		}
	}
	//use update effect to not run on initial render
	useUpdateEffect(() => {
		getData()
	}, [url])
	return {status, statusText, data, error, loading, setUrl}
}