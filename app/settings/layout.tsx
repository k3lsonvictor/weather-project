import PlatformContent from "../components/Structure/PlatformContent";
import { PlatformStructure } from "../components/Structure/PlatformStructure";
import { SideBar } from "../components/Structure/sideBar";


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