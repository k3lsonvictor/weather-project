"use server";
export default async function PlatformContent({ children }: { children: any }) {
  return (
    <main id="mainContent" className=" relative h-screen w-screen overflow-hidden z-[2]">
      {children}
    </main>
  );
}     