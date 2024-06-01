import { useEffect } from 'react';
interface ErrorObject {
    isError?: boolean;
    error: Error | { message: string };
    fallback?: () => void;
}

export const useErrors = (errors: ErrorObject[]) => {
    useEffect(() => {
        errors.forEach(({ isError = true, error, fallback }) => {
            if (isError) {
                if (fallback && typeof fallback === 'function') {
                    fallback();
                } else {
                    const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
                    toast({
                        variant: 'destructive',
                        description: errorMessage
                    });
                }
            }
        });
    }, [errors]);
};