import { StatusBar, StyleSheet, Text, View } from 'react-native';

// Components
import StatsData from './src/components/StatsData';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';

export default function App() {
  const {distance, progress, stepCount} = useHealthData({
    date: new Date(),
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black"/>
      <Text style={styles.title}>NewSteps</Text>
      <RingProgress progress={progress} radius={150} strokeWidth={38} />
      <View style={styles.statsContainer}>
        <StatsData label='Passos' value={stepCount.toString()} />
        <StatsData label='Distância' value={`${distance} m`} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    rowGap: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 55,
    flexWrap: 'wrap',
    marginTop: 40,
  },
  title: {
    fontSize: 40,
    color: '#AFB3BE',
    fontWeight: '500',
  }
});
