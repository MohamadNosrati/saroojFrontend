"use client";

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

interface IReactQueryProviderProps {
    children:React.ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryProvider : React.FC<IReactQueryProviderProps> = ({children})=>{
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
};

export default ReactQueryProvider;