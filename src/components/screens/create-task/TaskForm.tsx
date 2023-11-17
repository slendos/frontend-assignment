import {useForm} from 'react-hook-form';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {errorIdByMessage} from 'common/errors';
import {CheckIcon} from 'assets/icons';
import {RequiredText} from 'components/form/RequiredText';
import {withTrimmedValue} from 'utils';

import {DiscardButton} from './DiscardButton';

export type Task = {
  title: string;
  description?: string;
};

type Props = {
  submitButtonText: string;
  defaultValues?: Task;
  onSubmit(task: Task): void;
};

export function TaskForm({submitButtonText, defaultValues, onSubmit}: Props) {
  const form = useForm<Task>({defaultValues});
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {register} = form;
  const {errors} = form.formState;

  const handleSubmit = (task: Task) => {
    form.reset({title: '', description: ''});
    onSubmit(task);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Flex gap={20} direction="column">
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>
            <RequiredText>{t('createTask.titleLabel')}</RequiredText>
          </FormLabel>
          <Input
            {...withTrimmedValue(
              register('title', {
                required: {value: true, message: errorIdByMessage.required},
              })
            )}
            type="text"
          />
          <FormErrorMessage>{errors.title && t(errors.title.message)}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>{t('createTask.descriptionLabel')}</FormLabel>
          <Textarea {...withTrimmedValue(register('description'))} />
        </FormControl>
        <Flex justifyContent="space-between">
          <DiscardButton onConfirm={() => navigate({to: '/'})} />
          <Button
            type="submit"
            isDisabled={!!Object.keys(errors).length}
            fontSize="sm"
            rounded="3xl"
            rightIcon={<CheckIcon />}
          >
            {submitButtonText}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
