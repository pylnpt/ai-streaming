import Navbar from "../(browse)/_components/navbar";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen">
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>
      </div>
    </>
  );
};

export default LegalLayout;
