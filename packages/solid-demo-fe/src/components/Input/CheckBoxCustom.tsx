import { Checkbox } from '@suid/material';
import { IFormControl, createFormControl } from 'solid-forms';
import { Component, mergeProps } from 'solid-js';

interface CheckBoxCustomProps {
  control?: IFormControl<boolean>;
}

const CheckBoxCustom: Component<CheckBoxCustomProps> = (_props) => {
  const props = mergeProps({ control: createFormControl(false) }, _props);
  return (
    <Checkbox value={props.control.value} color='primary' onChange={(e) => props.control.setValue(e.target.checked)} />
  );
};

export { CheckBoxCustom };
