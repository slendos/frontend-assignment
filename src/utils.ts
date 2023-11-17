import {UseFormRegisterReturn} from 'react-hook-form/dist/types/form';
import {ChangeHandler} from 'react-hook-form';

export function assert<TValue>(value: TValue): asserts value is Exclude<TValue, undefined | null> {
  if (value === undefined || value === null) {
    throw new Error(`Value:"${value}" is nil`);
  }
}

export function withTrimmedValue<TFieldName extends string>(
  values: UseFormRegisterReturn<TFieldName>
) {
  const onChange: ChangeHandler = (event) => {
    const {target} = event;
    target.value = target.value.trim();
    return values.onChange(event);
  };

  return {...values, onChange};
}
