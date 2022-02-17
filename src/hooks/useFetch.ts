import { useState, useEffect } from 'react'
import axios from 'axios'

export type TApiResponse = {
	status: number
	statusText: string
	data: any
	error: any
	loading: boolean
}

export const useFetch = (url: string): TApiResponse => {
	//initialize the states needed
	const [status, setStatus] = useState<number>(0)
	const [statusText, setStatusText] = useState<string>('')
	const [data, setData] = useState<any>()
	const [error, setError] = useState<any>()
	const [loading, setLoading] = useState<boolean>(false)

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
		setLoading(false)
	}

	useEffect(() => {
		getData()
	}, [])
	return {status, statusText, data, error, loading}
}