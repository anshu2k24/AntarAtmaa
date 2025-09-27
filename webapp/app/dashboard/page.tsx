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
        router.replace('/login');
      } else {
        router.replace('/dashboard/risk-maps'); 
      }
    }
  }, [router]);

  return null; 
};

export default DashboardPage;
