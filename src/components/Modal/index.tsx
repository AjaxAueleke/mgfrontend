import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { IDoctor } from "../../pages/patient";
import AppointmentModalBody from "./ModalBody";

export interface ISchedueleModal {
  isOpen: boolean;
  onClose: () => void;
  bookAnAppointment: () => void;
  doctor: IDoctor | null;
}

export default function AppointmentModal(props: ISchedueleModal) {
  const { isOpen, onClose, bookAnAppointment, doctor } = props;

  return (
    <>
      <Modal isOpen={isOpen} size={["full", "lg", "lg"]} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AppointmentModalBody doctor={doctor} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={bookAnAppointment}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
