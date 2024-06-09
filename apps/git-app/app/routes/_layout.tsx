export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-16 flex flex-col h-screen w-screen items-center">
      <main className="flex flex-col justify-start items-center">
        {children}
      </main>
    </div>
  );
};
