import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar"

const Layout: FC = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
