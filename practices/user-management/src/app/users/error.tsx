'use client';

import { useEffect } from 'react';

// Components
import { Button } from '@/components';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
};

export default Error;
