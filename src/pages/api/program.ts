import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}

	switch (req.method) {
		case 'GET': console.log('build'); break
		default:
			res.status(405).json({ message: 'Method not allowed' })
	}

}