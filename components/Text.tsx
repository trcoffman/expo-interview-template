import { memo } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { AppThemes } from '../unistyles';

// TODO: Install Helvetica Now and use it.
const stylesheet = createStyleSheet((theme) => ({
  text: {
    variants: {
      type: {
        'body-large': theme.typography.body.large,
        'body-medium': theme.typography.body.medium,
        'body-small': theme.typography.body.small,
        'display-large': theme.typography.display.large,
        'display-medium': theme.typography.display.medium,
        'display-small': theme.typography.display.small,
        'headline-large': theme.typography.headline.large,
        'headline-medium': theme.typography.headline.medium,
        'headline-small': theme.typography.headline.small,
        'label-large': theme.typography.label.large,
        'label-large-prominent': theme.typography.label.largeProminent,
        'label-medium': theme.typography.label.medium,
        'label-medium-prominent': theme.typography.label.mediumProminent,
        'label-small': theme.typography.label.small,
      },
    },
  },
}));

export interface TextProps extends RNTextProps {
  /** What type of text are you displaying? */
  type: keyof ReturnType<typeof stylesheet>['text']['variants']['type'];
  /** A color token from our design system. */
  color?: keyof AppThemes[keyof AppThemes]['colors'];
}

/**
 * A text component.
 */
export const Text = memo((props: TextProps) => {
  const { color = 'onSurface', type, ...rest } = props;
  const { styles, theme } = useStyles(stylesheet, { type });

  const colorStyle = { color: theme.colors[color] };
  return <RNText {...rest} style={[styles.text, colorStyle, props.style]} />;
});
