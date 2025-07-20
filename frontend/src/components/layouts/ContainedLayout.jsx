// In frontend/src/components/layouts/ContainedLayout.jsx (NEW FILE)

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function ContainedLayout() {
  return (
    <Container className="mt-4">
      <Outlet /> {/* This will render the actual page component inside a container */}
    </Container>
  );
}

export default ContainedLayout;
