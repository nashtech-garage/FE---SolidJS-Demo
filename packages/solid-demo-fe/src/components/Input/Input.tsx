import { Show, mergeProps, type Component, For } from "solid-js";
import { IFormControl, createFormControl } from "solid-forms";
import { styled,TextField } from "@suid/material";

const StyledTextInput = styled(TextField)({
  marginBottom: '2rem',
  minWidth: '300px'
});

export const TextInput: Component<{
  control?: IFormControl<string | undefined>;
  name?: string;
  type?: string;
  label?:string;
}> = (props) => {
  // here we provide a default form control in case the user doesn't supply one
  props = mergeProps({ control: createFormControl(""), type: "text" }, props);
  return (
    <div
      classList={{
        "is-invalid": !!props?.control?.errors,
        "is-touched": props?.control?.isTouched,
        "is-required": props?.control?.isRequired,
      }}
    >
      <StyledTextInput
        label={props.label}
        name={props.name}
        type={props.type}
        variant="outlined"
        value={props?.control?.value}
        onChange={(e) => {          
          props.control.setValue(e.currentTarget.value);
        }}
        onblur={() => props.control.markTouched(true)}
        required={props?.control?.isRequired}
      />
      <Show when={props?.control?.isTouched && !props?.control?.isValid}>
        <For each={props?.control?.errors&&Object.values(props?.control?.errors)}>
          {(errorMsg: string) => <small>{errorMsg}</small>}
        </For>
      </Show>
    </div>
  );
};