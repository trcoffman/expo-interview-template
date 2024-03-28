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
    button: {
      alignItems: 'center',
      backgroundColor: colors.cornflowerBlue,
      borderRadius: 24,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
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
