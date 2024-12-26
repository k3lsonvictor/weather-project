import { HeaderMobile } from "../components/Layout/Structure/headerMobile";
import PlatformContent from "../components/Layout/Structure/PlatformContent";
import { PlatformStructure } from "../components/Layout/Structure/PlatformStructure";
import { SideBar } from "../components/Layout/Structure/sideBar";

export default async function PlatformLayout({ children }: { children: any }) {

  return (
    <PlatformStructure>
      <SideBar />
      <HeaderMobile />
      <PlatformContent>
        {children}
      </PlatformContent>
    </PlatformStructure>
  );
}