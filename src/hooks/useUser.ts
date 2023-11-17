import {useAppSelector} from 'store';
import {assert} from 'utils';

export function useUser() {
  const user = useAppSelector((state) => state.user.data);

  assert(user);

  return user;
}
