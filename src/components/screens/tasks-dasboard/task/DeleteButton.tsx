import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';

import {DeleteIcon} from 'assets/icons';

type Props = {
  onConfirm(): void;
};

export function DeleteButton({onConfirm}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {t} = useTranslation();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuItem color="#B71C1C" icon={<DeleteIcon />} onClick={onOpen}>
        {t('dashboard.todo.delete.buttonText')}
      </MenuItem>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('dashboard.todo.delete.confirmTitle')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('dashboard.todo.delete.confirmation')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('dashboard.todo.delete.cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                ml={3}
              >
                {t('dashboard.todo.delete.buttonText')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
