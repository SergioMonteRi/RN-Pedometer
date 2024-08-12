import { StyleSheet, View } from 'react-native';

// Components
import StatsData from './src/components/StatsData';
import RingProgress from './src/components/RingProgress';

export default function App() {
  return (
    <View style={styles.container}>
      <RingProgress progress={0.6}/>

      <View style={styles.statsContainer}>
        <StatsData label='Steps' value='1000' />
        <StatsData label='Distance' value='0,75 km' />
        <StatsData label='flights climbed' value='5 km' />
      </View>
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
  statsContainer: {
    flexDirection: 'row', 
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 40,
  }
});
