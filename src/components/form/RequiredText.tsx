import {PropsWithChildren} from 'react';
import {Text} from '@chakra-ui/react';

export function RequiredText({children}: PropsWithChildren<unknown>) {
  return (
    <>
      <Text as="span" color="red.500">
        *
      </Text>{' '}
      {children}
    </>
  );
}
