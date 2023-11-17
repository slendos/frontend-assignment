import {createSlice, PayloadAction, nanoid} from '@reduxjs/toolkit';
import {enableMapSet} from 'immer';

enableMapSet();

export type Task = {id: string; title: string; completed?: boolean; description?: string};
export type TasksState = {items: Task[]};

const initialState: TasksState = {items: []};

type RemovePayloadAction = PayloadAction<Task['id']>;
type AddPayloadAction = PayloadAction<Omit<Task, 'id'>>;
type EditPayloadAction = PayloadAction<Partial<Omit<Task, 'id'>> & Pick<Task, 'id'>>;

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action: AddPayloadAction) => {
      state.items.push({...action.payload, id: nanoid()});
    },
    remove: (state, action: RemovePayloadAction) => {
      const taskId = action.payload;

      state.items = state.items.filter((item) => item.id !== taskId);
    },
    edit: (state, action: EditPayloadAction) => {
      const editedTask = action.payload;

      state.items.map((task) => {
        if (task.id === editedTask.id) {
          return {...task, ...editedTask};
        }

        return task;
      });
    },
  },
});

export const actions = tasksSlice.actions;
export const reducer = tasksSlice.reducer;
