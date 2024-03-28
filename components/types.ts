import type { ComponentType, PropsWithRef, ReactNode } from 'react';

export type ComponentWithReplacementProps<
  T extends ComponentType<any>,
  SubstituteProps extends object,
> = T extends (props: infer _P extends SubstituteProps, legacyContext?: any) => ReactNode
  ? ComponentType<PropsWithRef<SubstituteProps>>
  : never;

export type ButtonStateProps = {
  states: {
    hover: boolean;
    focus: boolean;
    active: boolean;
    disabled: boolean | undefined;
    focusVisible: boolean;
  };
};

export type CheckboxStateProps = {
  states: {
    checked: boolean | undefined;
    disabled: boolean | undefined;
    hover: boolean | undefined;
    invalid: boolean | undefined;
    readonly: boolean | undefined;
    active: boolean | undefined;
    focused: boolean | undefined;
    indeterminate: boolean | undefined;
    focusVisible: boolean | undefined;
  };
};

export type RadioStateProps = {
  states: {
    readonly: boolean | undefined;
    intermediate: boolean | undefined;
    checked: boolean | undefined;
    focusVisible: boolean | undefined;
    disabled: boolean | undefined;
    invalid: boolean | undefined;
    hover: boolean | undefined;
    focus: boolean | undefined;
    active: boolean | undefined;
  };
};

export type InputStateProps = {
  states: {
    focus: boolean | undefined;
    invalid: boolean | undefined;
    readonly: boolean | undefined;
    required: boolean | undefined;
    hover: boolean | undefined;
    focusVisible: boolean | undefined;
    disabled: boolean | undefined;
  };
};
