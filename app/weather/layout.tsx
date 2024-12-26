import PlatformContent from "../components/Layout/Structure/PlatformContent";
import { PlatformStructure } from "../components/Layout/Structure/PlatformStructure";
import { SideBar } from "../components/Layout/Structure/sideBar";

export default async function PlatformLayout({ children }: { children: any }) {
  return (
    <PlatformStructure>
      <SideBar/>
      <PlatformContent>
        {children}
      </PlatformContent>
    </PlatformStructure>
  );
}