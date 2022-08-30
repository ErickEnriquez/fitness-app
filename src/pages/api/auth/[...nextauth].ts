import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from 'prisma/prisma'

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id
			return session
		},
		async signIn({ user }) {
			//check if userId is already in the system, if not reject sign-in attempt
			const u = await prisma.user.findFirst({ where: { id: user.id } })
			if (!u) {
				return false
			}
			return true
		}
	},
	secret: process.env.SECRET,
	events: {
		signIn: async ({ user }) => {
			console.log(user.name)
			//do something with the user info
		}
		// createUser: async ({ user }) => {
		// 	// Create stripe API client using the secret key env variable
		// 	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		// 		apiVersion: "2020-08-27",
		// 	});

		// 	// Create a stripe customer for the user with their email address
		// 	await stripe.customers
		// 		.create({
		// 			email: user.email!,
		// 		})
		// 		.then(async (customer) => {
		// 			// Use the Prisma Client to update the user in the database with their new Stripe customer ID
		// 			return prisma.user.update({
		// 				where: { id: user.id },
		// 				data: {
		// 					stripeCustomerId: customer.id,
		// 				},
		// 			});
		// 		});
		// },
	}
}

export default NextAuth(authOptions)