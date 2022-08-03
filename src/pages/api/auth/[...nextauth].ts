import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from 'prisma/prisma'

export default NextAuth({
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
	},
	secret: process.env.SECRET,
	events: {
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
		signIn: async ({ user }) => {
			console.log(user)
		}
	}
})