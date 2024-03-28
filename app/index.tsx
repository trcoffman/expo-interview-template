import { Stack } from 'expo-router';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RadioItem, RadioGroup } from '../components/Radio';

export default function Page() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Stack.Screen options={{ title: 'Overview' }} />
        <View>
          <RadioGroup>
            <RadioItem value="yes">Yes</RadioItem>
            <RadioItem value="no">No</RadioItem>
          </RadioGroup>
        </View>
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
