import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

import {
    RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <div className=''>
                        <RouterProvider router={router} />
                    </div>
                </HelmetProvider>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>,
)
