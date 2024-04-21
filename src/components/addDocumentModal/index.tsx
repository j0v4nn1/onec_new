import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { Props } from './index.types';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addContractToProvider } from 'utils';
import { Document, Provider } from 'service/slices/general/index.types';
import { updateProviderDocument } from 'service/slices/general';
import { setContract } from 'service/slices/receipts';

const AddDocumentModal = ({ isDocumentModalShowed, setIsDocumentModalShowed }: Props) => {
  const dispatch = useAppDispatch();
  const { providers } = useAppSelector((store) => store.general);
  const [isActiveDocument, setIsActiveDocument] = useState(false);
  const [activeDocumentId, setActiveDocumentId] = useState('');
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);
  const [documentInput, setDocumentInput] = useState('');
  const { provider } = useAppSelector((store) => store.receipts.newReceipt);

  const onChangeDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentInput(event.target.value);
  };

  const documents = providers.find((p) => {
    return p.name === provider.name;
  })?.documents;

  const documentsList =
    documents !== undefined &&
    documents.map((document) => {
      return (
        <ListGroup.Item
          onClick={() => {
            setIsActiveDocument(true);
            setActiveDocumentId(document._id);
            setActiveDocument(document);
          }}
          action
          active={isActiveDocument && document._id === activeDocumentId}
          key={document._id}>
          {document.name}
        </ListGroup.Item>
      );
    });

  const closeModal = () => {
    setIsDocumentModalShowed(false);
    setActiveDocumentId('');
    setIsActiveDocument(false);
  };

  return (
    <Modal
      show={isDocumentModalShowed}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Выбрать договор</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs="auto">
            <Form.Control
              value={documentInput}
              onChange={onChangeDocument}
              type="text"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button
              onClick={() => {
                const _id = uuidv4();
                addContractToProvider(provider._id, { _id, name: documentInput })
                  .then((data: Provider) => {
                    dispatch(updateProviderDocument(data));
                  })
                  .catch((err) => console.log(err))
                  .finally(() => {
                    setDocumentInput('');
                  });
              }}
              type="submit">
              Добавить
            </Button>
          </Col>
        </Row>
        <ListGroup className="mt-3">{documentsList}</ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Закрыть</Button>
        <Button
          onClick={() => {
            activeDocument && dispatch(setContract(activeDocument.name));
            closeModal();
          }}
          disabled={!isActiveDocument}>
          Выбрать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDocumentModal;
