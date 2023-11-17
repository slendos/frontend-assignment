import {Text, Flex, VStack, Button, HStack} from '@chakra-ui/react';
import {Route, useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';

import {Tasks} from 'components/screens/tasks-dasboard/Tasks';
import {withAuth} from 'screens/authenticated/utils/withAuth0';
import {rootRoute} from 'screens/rootRoute';
import {useUser} from 'hooks/useUser';
import {AddIcon} from 'assets/icons';

export function TasksDashboardPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {name} = useUser();

  return (
    <Flex direction="column" gap="40px">
      <HStack justifyContent="space-between" bg="inherit">
        <VStack alignItems="start">
          <Text>{t('dashboard.welcomeText', {name})}</Text>
          <Text color="grey">{format(new Date(), 'd. MMMM yyyy')}</Text>
        </VStack>
        <div>
          <Button
            rounded="2xl"
            fontSize="sm"
            minWidth="124px"
            rightIcon={<AddIcon height="9.33px" width="9.33px" color="white" />}
            onClick={() => navigate({to: '/task/create'})}
          >
            {t('dashboard.todo.addButtonText')}
          </Button>
        </div>
      </HStack>
      <Tasks />
    </Flex>
  );
}

export const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: withAuth(TasksDashboardPage),
});
