import {useAppSelector} from 'store';
import {Task as ITask} from 'store/tasks';

import {TodoTasks} from './TodoTasks';
import {CompletedTasks} from './CompletedTasks';

export function Tasks() {
  const {completed, notCompleted} = useAppSelector((state) =>
    state.tasks.items.reduce(
      (acc, task) => {
        const key = task.completed ? 'completed' : 'notCompleted';

        acc[key].push(task);

        return acc;
      },
      {
        completed: new Array<ITask>(),
        notCompleted: new Array<ITask>(),
      }
    )
  );

  return (
    <>
      <TodoTasks tasks={notCompleted} />
      <CompletedTasks tasks={completed} />
    </>
  );
}
