// In frontend/src/components/layouts/DefaultLayout.jsx (REPLACE ENTIRE FILE)

import { Outlet } from 'react-router-dom';

function DefaultLayout() {
  // We remove the Container from here so that pages like HomePage can control their own layout.
  // Pages that need a container will add it themselves.
  return (
    <Outlet />
  );
}

export default DefaultLayout;
