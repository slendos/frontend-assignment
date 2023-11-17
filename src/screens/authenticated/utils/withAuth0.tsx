import {FC, PropsWithChildren, useEffect} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {Box, Container, Flex, Text} from '@chakra-ui/react';

import {Avatar, ZentaskPreview} from 'assets/icons';
import {useAppSelector} from 'store';

function AuthenticatedScreen({children}: PropsWithChildren<unknown>) {
  const user = useAppSelector((state) => state.user.data);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({to: '/login'});
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Container maxW="4xl">
      <Flex maxWidth="1280px" gap="40px" direction="column">
        <div />
        <Flex justifyContent="space-between">
          <ZentaskPreview width={128} height={32} />
          <Flex alignItems="center">
            <Avatar />
            <Text marginLeft="8px">{user.name}</Text>
          </Flex>
        </Flex>
        <div />
      </Flex>
      <Box padding={10} bg="white" minW="max" rounded="3xl" gap={40}>
        {children}
      </Box>
    </Container>
  );
}

export function withAuth(Component: FC) {
  function Authenticated() {
    return (
      <AuthenticatedScreen>
        <Component />
      </AuthenticatedScreen>
    );
  }

  return Authenticated;
}
