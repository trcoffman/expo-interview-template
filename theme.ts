const colors = {
  white: '#ffffff',
  azureRadiance: '#007AFF',
  limedSpruce: '#38434D',
  cornflowerBlue: '#6366F1',
  astral: '#2E78B7',
} as const;

export const lightTheme = {
  colors,
  components: {
    title: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.limedSpruce,
      fontSize: 36,
    },
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;
