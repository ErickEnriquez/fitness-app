import prisma from 'prisma/prisma'
import { Program } from '@prisma/client'

/**
 * Get the program given a userID
 * @param userId 
 * @returns {Promise<Program>} program
 */
export async function getProgram(userId: string): Promise<Program> {
	const program = await prisma.program.findFirst({
		where: { userId }
	})
	
	if (!program) throw Error('unable to get program data')
	return program
}