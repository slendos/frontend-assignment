import {Button, Flex, Heading, HStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Route, useNavigate} from '@tanstack/react-router';

import {TaskForm, Task} from 'components/screens/create-task/TaskForm';
import {withAuth} from 'screens/authenticated/utils/withAuth0';
import {rootRoute} from 'screens/rootRoute';
import {ArrowBackwardIcon} from 'assets/icons';
import {useAppDispatch} from 'store';
import {actions as taskActions} from 'store/tasks';

export function CreateTaskPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (task: Task) => {
    dispatch(taskActions.add(task));
    return navigate({to: '/'});
  };

  const onBackClick = () => navigate({to: '/'});

  return (
    <Flex gap={20} direction="column">
      <HStack>
        <Button bg="#F1F2F6" variant="solid" rounded="full" onClick={onBackClick}>
          <ArrowBackwardIcon />
        </Button>
        <Heading size="md">{t('createTask.heading')}</Heading>
      </HStack>
      <TaskForm submitButtonText={t('createTask.submitText')} onSubmit={handleSubmit} />
    </Flex>
  );
}

export const createTaskRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/task/create',
  component: withAuth(CreateTaskPage),
});
