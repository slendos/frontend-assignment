import {IconButton, Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import {forwardRef, useState} from 'react';
import {InputProps} from '@chakra-ui/input';

import {HideIcon, ShowIcon} from 'assets/icons';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow((show_) => !show_);

  return (
    <InputGroup size="md">
      <Input ref={ref} {...props} type={show ? 'text' : 'password'} placeholder="Enter password" />
      <InputRightElement>
        <IconButton
          bg="transparent"
          aria-label={show ? 'show icon' : 'hide icon'}
          onClick={handleClick}
          icon={show ? <ShowIcon /> : <HideIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
});
