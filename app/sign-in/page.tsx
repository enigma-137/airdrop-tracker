// app/sign-in/page.tsx

'use client';

import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const SignInPage = () => {
  const { isLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      (async () => {
        const token = await getToken();
        const userResponse = await fetch('https://api.clerk.dev/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await userResponse.json();

        await axios.post('/api/users/add', {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
        });

        router.push('/dashboard');  // Redirect to dashboard after successful sign-in
      })();
    }
  }, [isLoaded, userId]);

  return <SignIn />;
};

export default SignInPage;
