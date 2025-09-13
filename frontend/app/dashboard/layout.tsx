
import Header from '../dashboard/components/Header';
import Sidebar from '../dashboard/components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#121c2c] min-h-screen text-gray-200">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 pt-20 px-6 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;