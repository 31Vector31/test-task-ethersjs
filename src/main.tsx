import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from "./pages/App.tsx";
import {NotificationsProvider} from '@toolpad/core/useNotifications';
import EthereumProvider from "./contexts/EthereumProvider.tsx";
import {AbstractProvider, BrowserProvider} from "ethers";

declare global {
    interface Window {
        ethereum?: BrowserProvider | AbstractProvider
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EthereumProvider>
            <NotificationsProvider>
                <App/>
            </NotificationsProvider>
        </EthereumProvider>
    </StrictMode>,
)
