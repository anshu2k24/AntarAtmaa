'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const employeeId = localStorage.getItem('employeeId');
      const organizationId = localStorage.getItem('organizationId');
      const siteId = localStorage.getItem('siteId');

      if (!employeeId || !organizationId || !siteId) {
        router.replace('/login'); // redirect to login if missing
      } else {
        router.replace('/dashboard/risk-maps'); // redirect logged-in users
      }
    }
  }, [router]);

  return null; // nothing rendered, just redirect
};

export default DashboardPage;
