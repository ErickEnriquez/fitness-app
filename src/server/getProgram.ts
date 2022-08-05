import prisma from 'prisma/prisma'
import { Program } from '@prisma/client'

/**
 * Get the program given a userID
 * @param userId 
 * @returns {Promise<Program>} program
 */
export async function getProgram(userId: string): Promise<Program> {
	try {
		const data = await prisma.program.findFirst({
			where: { userId }
		})
		return data
	} catch (err) {
		console.error(err)
		throw Error(err)
	}
}