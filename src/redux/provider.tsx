'use client'

import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}