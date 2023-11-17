import {Box, Flex, Heading} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {Task as ITask} from 'store/tasks';

import {Task} from './task/Task';

type Props = {tasks: ITask[]};

export function CompletedTasks({tasks}: Props) {
  const {t} = useTranslation();

  if (!tasks.length) {
    return null;
  }

  return (
    <Flex direction="column" gap="24px">
      <Box borderBottom="1px solid #E8E9F0">
        <Heading size="md" height="32px">
          {t('dashboard.completed.title')}
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
