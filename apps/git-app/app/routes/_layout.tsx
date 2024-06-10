export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-16 flex flex-col h-screen w-screen items-center">
      <main className="w-full flex flex-col justify-start items-center px-3 md:w-[720px]">
        {children}
      </main>
    </div>
  );
};
