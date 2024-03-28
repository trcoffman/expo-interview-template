import { createRadio } from '@gluestack-ui/radio';
import React, { forwardRef } from 'react';
import { Platform, Pressable, View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withClamp,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '../Text';
import type { ComponentWithReplacementProps, RadioStateProps } from '../types';

const stylesheet = createStyleSheet((theme) => ({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
      disabled: {
        true: {
          opacity: theme.state.disabled.defaultOpacity,
        },
      },
    },
  },
  input: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    variants: {
      horizontal: {
        true: {
          flexDirection: 'row',
          gap: 16,
        },
      },
    },
  },
  labelStyle: {
    paddingLeft: 4,
    variants: {
      disabled: {
        true: {
          opacity: theme.state.disabled.defaultOpacity,
        },
      },
    },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateLayer: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 40,
    variants: {
      checked: {
        true: {
          backgroundColor: theme.colors.primary,
        },
        false: {
          backgroundColor: theme.colors.onSurface,
        },
      },
      state: {
        hover: {
          opacity: theme.state.hover.stateLayerOpacity,
        },
        focused: {
          opacity: theme.state.focused.stateLayerOpacity,
        },
        active: {
          opacity: theme.state.active.stateLayerOpacity,
        },
        default: {
          opacity: 0,
        },
      },
      disabled: {
        true: {
          opacity: 0,
        },
      },
    },
  },
  target: {
    position: 'absolute',
    height: 48,
    width: 48,
  },
}));

type RadioRootProps = ViewProps;
type RadioRootPrivateProps = RadioStateProps & RadioRootProps;
const RadioItemRoot = forwardRef<View, RadioRootPrivateProps>((props, ref) => {
  const { styles } = useStyles(stylesheet);

  const RenderComponent = Platform.OS === 'web' ? View : Pressable;

  return <RenderComponent {...props} style={[styles.row, props.style]} ref={ref} />;
});

type RadioLabelTextProps = Partial<TextProps>;
type RadioLabelTextPrivateProps = RadioLabelTextProps & RadioStateProps;
const RadioItemLabelText = (props: RadioLabelTextPrivateProps) => {
  const { disabled } = props.states;

  const { styles } = useStyles(stylesheet, {
    disabled,
  });

  return <Text type="label-large" color="onSurface" style={styles.labelStyle} {...props} />;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function RadioIcon({ checked, disabled }: { checked: boolean; disabled: boolean }) {
  const { theme, styles } = useStyles(stylesheet, {
    disabled,
  });

  const color = checked ? theme.colors.primary : theme.colors.onSurfaceVariant;

  const iconSize = 20;
  const width = iconSize / 2;
  const strokeWidth = 2;
  const radius = width - strokeWidth / 2; // eslint-disable-line prettier/prettier
  const innerCircleRadius = 5;

  const dotRadius = useSharedValue(0);
  dotRadius.value = checked ? innerCircleRadius : 0;

  const animatedProps = useAnimatedProps(() => {
    return {
      r: withClamp(
        { min: 0 },
        withTiming(dotRadius.value, {
          duration: 200,
        })
      ),
    };
  });

  return (
    <View style={styles.iconContainer}>
      <Svg width={iconSize} height={iconSize}>
        <Circle
          cx={width}
          cy={width}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={width}
          cy={width}
          fill={color}
          {...(Platform.OS === 'web' ? { r: dotRadius.value } : { animatedProps })}
        />
      </Svg>
    </View>
  );
}

function computeState({ active, focusVisible, focus, hover }: RadioStateProps['states']) {
  return active
    ? 'active'
    : focusVisible || focus // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
      ? 'focused'
      : hover
        ? 'hover'
        : undefined;
}

type RadioItemIndicatorPrivateProps = RadioStateProps;
function RadioItemIndicator(props: RadioItemIndicatorPrivateProps) {
  const { states } = props;
  const state = computeState(states);
  const { styles } = useStyles(stylesheet, {
    checked: !!states.checked,
    state,
    disabled: !!states.disabled,
  });

  return (
    <View style={styles.input}>
      <View style={styles.target} />
      <View style={styles.stateLayer} />
      <RadioIcon checked={!!states.checked} disabled={!!states.disabled} />
    </View>
  );
}

type RadioGroupProps = ViewProps & {
  /** If the group should be horizontal */
  horizontal?: boolean;
};
type RadioGroupPrivateProps = RadioStateProps & RadioGroupProps;
const RadioItemGroup = forwardRef<View, RadioGroupPrivateProps>((props, ref) => {
  const { horizontal, ...rest } = props;
  const { styles } = useStyles(stylesheet, {
    horizontal,
  });

  return <View {...rest} style={[styles.groupContainer, props.style]} ref={ref} />;
});

const UIRadioItem = createRadio({
  Root: RadioItemRoot as unknown as ComponentWithReplacementProps<
    typeof RadioItemRoot,
    RadioRootProps
  >,
  Group: RadioItemGroup as unknown as ComponentWithReplacementProps<
    typeof RadioItemGroup,
    RadioGroupProps
  >,
  Icon: View,
  Indicator: RadioItemIndicator as ComponentWithReplacementProps<
    typeof RadioItemIndicator,
    RadioLabelTextProps
  >,
  Label: RadioItemLabelText as ComponentWithReplacementProps<
    typeof RadioItemLabelText,
    RadioLabelTextProps
  >,
});

type RadioItemProps = Omit<
  React.ComponentProps<typeof UIRadioItem>,
  'isInvalid' | 'isIndeterminate'
>;
const RadioItem = (props: RadioItemProps) => {
  return (
    <UIRadioItem {...props}>
      <UIRadioItem.Indicator />
      <UIRadioItem.Label>{props.children}</UIRadioItem.Label>
    </UIRadioItem>
  );
};

const RadioGroup = UIRadioItem.Group;

export { RadioItem, RadioGroup };
