import {Button, Flex, Heading, HStack} from '@chakra-ui/react';
import {Route, useNavigate, useParams} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {TaskForm} from 'components/screens/create-task/TaskForm';
import {withAuth} from 'screens/authenticated/utils/withAuth0';
import {rootRoute} from 'screens/rootRoute';
import {ArrowBackwardIcon} from 'assets/icons';
import {useAppDispatch, useAppSelector} from 'store';
import {actions as taskActions, Task} from 'store/tasks';

export function EditTaskPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {taskId} = useParams({from: editTaskRoute.id});
  const {t} = useTranslation();

  const originalTask = useAppSelector((state) =>
    state.tasks.items.find((task) => task.id === taskId)
  );

  if (!originalTask) {
    return <div>Not found</div>;
  }

  const handleSubmit = (task: Omit<Task, 'id'>) => {
    dispatch(taskActions.edit({...task, id: originalTask.id}));
    return navigate({to: '/'});
  };

  const onBackClick = () => navigate({to: '/'});

  return (
    <Flex gap={20} direction="column">
      <HStack>
        <div>
          <Button bg="#F1F2F6" variant="solid" rounded="full" onClick={onBackClick}>
            <ArrowBackwardIcon />
          </Button>
        </div>
        <Heading size="md">{originalTask.title}</Heading>
      </HStack>
      <TaskForm
        submitButtonText={t('editTask.submitButtonText')}
        defaultValues={originalTask}
        onSubmit={handleSubmit}
      />
    </Flex>
  );
}

export const editTaskRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/task/$taskId',
  component: withAuth(EditTaskPage),
});
