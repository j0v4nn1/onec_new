import Button from 'react-bootstrap/Button';
import { Modal as ModalBootstrap } from 'react-bootstrap';

const Modal = () => {
  return (
    <ModalBootstrap size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title id="contained-modal-title-vcenter">
          Modal heading
        </ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button>Close</Button>
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  );
};

export default Modal;
