import {Button, Flex, FormControl, FormErrorMessage, FormLabel, Input} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {ArrowForwardIcon} from 'assets/icons';
import {RequiredText} from 'components/form/RequiredText';
import {PasswordInput} from 'components/form/PasswordInput';
import {useAppDispatch} from 'store';
import {actions as userActions} from 'store/user';
import {errorIdByMessage} from 'common/errors';
import {withTrimmedValue} from 'utils';

import {users} from '../../../constants';

type FormModel = {
  username: string;
  password: string;
};

export function LoginForm() {
  const {register, formState, handleSubmit, setError} = useForm<FormModel>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {errors} = formState;

  const handleLogin = (data: FormModel) => {
    const user = users.find(
      (user) => user.password === data.password && user.username === data.username
    );

    if (!user) {
      setError('password', {
        type: 'invalid_password',
        message: 'login.form.loginFail',
      });

      return;
    }

    dispatch(userActions.set({name: user.username, id: user.id}));
    return navigate({to: '/'});
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Flex direction="column" gap="40px">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>
            <RequiredText>{t('login.form.usernameLabel')}</RequiredText>
          </FormLabel>
          <Input
            {...withTrimmedValue(
              register('username', {required: {value: true, message: errorIdByMessage.required}})
            )}
            type="text"
          />
          <FormErrorMessage>{errors.username && t(errors.username.message)}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>
            <RequiredText>{t('login.form.passwordLabel')}</RequiredText>
          </FormLabel>
          <PasswordInput
            {...withTrimmedValue(
              register('password', {required: {value: true, message: errorIdByMessage.required}})
            )}
          />
          <FormErrorMessage>
            <FormErrorMessage>{errors.password && t(errors.password.message)}</FormErrorMessage>
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          borderRadius="3xl"
          isDisabled={!!Object.keys(errors).length}
          fontSize="sm"
          rightIcon={<ArrowForwardIcon />}
        >
          {t('login.form.submitButtonText')}
        </Button>
      </Flex>
    </form>
  );
}
