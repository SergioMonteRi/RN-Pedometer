import { StyleSheet, View } from 'react-native';

// Components
import StatsData from './src/statsData';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <StatsData label='Steps' value='1000' />
        <StatsData label='Distance' value='0,75 km' />
      </View>

      <StatsData label='flights climbed' value='5 km' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },

});
