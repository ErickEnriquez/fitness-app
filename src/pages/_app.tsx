import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import store from '../app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)


export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</SessionProvider>
	)
}
