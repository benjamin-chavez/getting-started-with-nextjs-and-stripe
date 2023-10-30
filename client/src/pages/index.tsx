import Image from 'next/image';
import { Inter } from 'next/font/google';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    fetch('api/keys', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPublishableKey(data.publishableKey);
      });
  });

  if (!publishableKey) {
    return 'Loading...';
  }

  const stripe = loadStripe(publishableKey);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>STRIPE</h1>
      </div>
    </main>
  );
}
