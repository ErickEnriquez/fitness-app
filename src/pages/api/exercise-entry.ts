import { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => { 
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed' })
	}
	
}