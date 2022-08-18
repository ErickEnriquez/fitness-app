import { unstable_getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '@auth/[...nextauth]'
import { getProgram } from '@server/getProgram'
import { Session } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ message: 'unauthorized' })
		return
	}

	switch (req.method) {
		case 'GET': await getProgramData(req, res, session); break
		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}

/**
 * get the data for a program given a userId 
 * @param req 
 * @param res 
 * @returns 
 */
const getProgramData = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	try {
		const program = await getProgram(session.user.id)
		res.status(200).json(program)
	} catch (err) {
		res.status(500).end()
	}
}