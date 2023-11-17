import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  onConfirm(): void;
};

export function DiscardButton({onConfirm}: Props) {
  const {t} = useTranslation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button bg="#F1F2F6" color="black" fontSize="sm" rounded="3xl" onClick={onOpen}>
        {t('createTask.discard.buttonText')}
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('createTask.discard.confirmTitle')}
            </AlertDialogHeader>

            <AlertDialogBody> {t('createTask.discard.confirmation')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('createTask.discard.cancel')}
              </Button>
              <Button
                ml={3}
                colorScheme="red"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {t('createTask.discard.confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
