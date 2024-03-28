import { Stack, Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Page() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Stack.Screen options={{ title: 'Overview' }} />
        <View>
          <Text style={theme.components.title}>Hello World</Text>
          <Text style={theme.components.subtitle}>This is the first page of your app.</Text>
        </View>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <TouchableOpacity style={theme.components.button}>
            <Text style={theme.components.buttonText}>Show Details</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
  },
});
