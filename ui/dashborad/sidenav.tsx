import { LogoutButton } from "../account/logout-form";
import LevelupLogo from "../logo";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="flex flex-col h-full px-3 py-4 md:px-2">
      <div className="flex items-end justify-start h-20 p-4 mb-2 bg-blue-600 rounded-md md:h-40">
        <LevelupLogo />
      </div>
      <div className="flex flex-row justify-between space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden grow bg-gray-50 md:block md:h-auto md:rounded-md"></div>
        <LogoutButton />
      </div>
    </div>
  );
}
