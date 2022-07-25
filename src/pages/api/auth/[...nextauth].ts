import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextApiRequest, NextApiResponse } from 'next'


const options = {
	providers: [
		GoogleProvider({
			clientId: 'GOOGLE_CLIENT_ID',
			clientSecret: 'GOOGLE_CLIENT_SECRET',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	// pages: {
	// 	signIn: '/auth/signin',
	// 	signOut: '/auth/signout',
	// 	error: '/auth/error', // Error code passed in query string as ?error=
	// 	verifyRequest: '/auth/verify-request', // (used for check email message)
	// 	newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	// },
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === 'google') {
				return profile.email_verified && profile.email.endsWith('@google.com')
			}
			return false // Do different verification for other providers that don't have `email_verified`
		},
	}

}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> | void => NextAuth(req, res, options)