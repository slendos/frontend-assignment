import {useCheckbox, UseCheckboxProps} from '@chakra-ui/react';
import styled from 'styled-components';

import {CheckboxChecked, CheckboxUnchecked} from 'assets/icons';

const CheckboxWrapperStyled = styled.div`
  cursor: pointer;
  border-width: 1px;
  border-radius: 3px;
  width: 24px;
  height: 24px;
`;

export function CustomCheckbox(props: UseCheckboxProps) {
  const {state, getCheckboxProps, getInputProps, getLabelProps} = useCheckbox(props);

  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} hidden />
      <CheckboxWrapperStyled {...getCheckboxProps()}>
        {state.isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
      </CheckboxWrapperStyled>
    </label>
  );
}
