import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {ZentaskLogo} from 'assets/icons';
import {Task as ITask} from 'store/tasks';

import {Task} from './task/Task';

type Props = {tasks: ITask[]};

export function TodoTasks({tasks}: Props) {
  const {t} = useTranslation();

  if (!tasks.length) {
    return (
      <Flex alignItems="center" direction="column">
        <ZentaskLogo width={150} height={130} />
        <Heading marginTop="16px">{t('dashboard.motivationalMessage')}</Heading>
        <Text marginTop="12px">{t('dashboard.noMoreTasks')}</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="24px">
      <Box borderBottom="1px solid #E8E9F0">
        <Heading size="md" height="32px">
          {t('dashboard.todo.title')}
        </Heading>
      </Box>
      <Flex direction="column" gap="16px">
        {tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
      </Flex>
    </Flex>
  );
}
