import {useEffect} from 'react';
import {Box, Heading, VStack, Flex, Text} from '@chakra-ui/react';
import {Route, useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {ZentaskPreview} from 'assets/icons';
import {LoginForm} from 'components/screens/login/LoginForm';
import {useAppSelector} from 'store';

import {rootRoute} from './rootRoute';

function LoginPage() {
  const {t} = useTranslation();
  const user = useAppSelector((state) => state.user.data);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({to: '/'});
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <Flex direction="column" alignItems="center" justifyItems="center" gap={10}>
      <div />
      <ZentaskPreview width={128} height={32} />
      <Box padding={10} maxW="sm" rounded="3xl" backgroundColor="white" maxWidth="480px">
        <Flex direction="column" gap="40px">
          <VStack textAlign="left" alignItems="start" gap="24px">
            <Heading as="h4" size="md">
              {t('login.welcome.title')}
            </Heading>
            <Text>{t('login.welcome.text')}</Text>
          </VStack>
          <LoginForm />
        </Flex>
      </Box>
    </Flex>
  );
}

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});
