import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  const { styles, theme } = useStyles(stylesheet);

  const BackButton = () => (
    <TouchableOpacity onPress={router.back}>
      <View style={styles.backButton}>
        <Feather name="chevron-left" size={16} color={theme.colors.azureRadiance} />
        <Text style={styles.backButtonText}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Details', headerLeft: () => <BackButton /> }} />
      <View style={styles.main}>
        <Text style={theme.components.title}>Details</Text>
        <Text style={theme.components.subtitle}>Showing details for user {name}.</Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  backButton: {
    flexDirection: 'row',
  },
  backButtonText: {
    color: theme.colors.azureRadiance,
    marginLeft: 4,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
}));
