import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import {ChangeEvent, memo} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {EditIcon, MoreVericalIcon} from 'assets/icons';
import {CustomCheckbox} from 'components/form/CustomCheckbox';
import {actions as taskActions, Task as ITask} from 'store/tasks';
import {useAppDispatch} from 'store';

import {DeleteButton} from './DeleteButton';

type Props = {
  data: ITask;
};

function TaskComponent({data}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleDeleteTask = () => {
    dispatch(taskActions.remove(data.id));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(taskActions.edit({...data, completed: event.target.checked}));
  };

  return (
    <FormControl>
      <Flex direction="column" gap="4px" alignSelf="stretch" bg="white" maxWidth="850px">
        <HStack
          justify="space-between"
          alignItems="center"
          gap="16px"
          maxWidth="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <HStack align="center" gap="16px">
            <HStack alignSelf="center">
              <CustomCheckbox isChecked={data.completed} onChange={handleCheckboxChange} />
            </HStack>
            <FormLabel>
              <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="800px">
                {data.title}
              </Text>
            </FormLabel>
          </HStack>
          <Menu placement="bottom-end">
            <MenuButton
              bg="transparent"
              as={IconButton}
              aria-label="Options"
              icon={<MoreVericalIcon />}
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => navigate({to: '/task/$taskId', params: {taskId: data.id}})}
              >
                {t('dashboard.todo.editText')}
              </MenuItem>
              <DeleteButton onConfirm={handleDeleteTask} />
            </MenuList>
          </Menu>
        </HStack>
        {data.description && (
          <Box color="#7A869A" marginLeft="48px" flex="1 0 0">
            {data.description}
          </Box>
        )}
      </Flex>
    </FormControl>
  );
}

export const Task = memo(TaskComponent);
