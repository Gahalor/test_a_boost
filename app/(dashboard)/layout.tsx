import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
      <div className="h-full relative  bg-slate-100">
        <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z-[80]">
          <Sidebar />
        </div>
        <main className="md:pl-80">
          <div className="w-full h-24">
            <div className="h-full">
              <Navbar/>
              </div>
          </div>
          <div className="mt-0 px-12">
            {children}
          </div>
        </main>
      </div>

  );
}

export default DashboardLayout;