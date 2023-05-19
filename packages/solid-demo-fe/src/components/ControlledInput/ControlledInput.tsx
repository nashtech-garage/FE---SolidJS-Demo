import { Card, Grid, OutlinedInput, styled } from '@suid/material';
import { IFormControl, createFormControl } from 'solid-forms';
import { mergeProps } from 'solid-js';
import { JSX } from 'solid-js';

interface ControlledInputProps {
  name: string;
  type?: string;
  control: IFormControl<string>;
}

const ControlledInput = ({ name, type = 'text', control }: ControlledInputProps) => {
  return (
    <OutlinedInput
      name={name}
      type={type}
      placeholder='Text...'
      value={control.value}
      oninput={(e) => {
        console.log('e', e);

        // control.setValue(e.currentTarget.value);
      }}
      onblur={() => control.markTouched(true)}
      required={control.isRequired}
    />
  );
};

export default ControlledInput;
