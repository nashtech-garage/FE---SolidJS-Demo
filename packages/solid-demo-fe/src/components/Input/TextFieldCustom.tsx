import { TextField } from '@suid/material';
import { IFormControl, createFormControl } from 'solid-forms';
import { Component, mergeProps, onCleanup } from 'solid-js';

interface TextFieldCustomProps {
  id?: string;
  type?: string;
  control?: IFormControl<string>;
  label?: string;
  name?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  margin?: 'dense' | 'normal' | 'none';
  helperText?: string;
}

const TextFieldCustom: Component<TextFieldCustomProps> = (_props) => {
  const props = mergeProps({ control: createFormControl(''), type: 'text' }, _props);

  onCleanup(() => {
    props.control.setValue('');
    props.control.markTouched(false);
  });

  return (
    <TextField
      id={props.id}
      label={props.label}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      fullWidth={props.fullWidth}
      margin={props.margin}
      name={props.name}
      type={props.type}
      value={props.control.value}
      onChange={(e) => props.control.setValue(e.currentTarget.value)}
      onBlur={() => props.control.markTouched(true)}
      disabled={props.control.isDisabled}
      required={props.control.isRequired}
      helperText={props.control.isTouched && props.control.errors?.error}
      error={!!props.control.errors?.error && props.control.isTouched}
    />
  );
};

export { TextFieldCustom };
