import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

// Components
import StatsData from './src/components/StatsData';
import RingProgress from './src/components/RingProgress';
import useHealthData from './src/hooks/useHealthData';



export default function App() {
  const {distance, flightClimbed, progress, stepCount} = useHealthData({
    date: new Date(),
  });

  return (
    <View style={styles.container}>
      <RingProgress progress={progress} radius={150} strokeWidth={38} />
      <View style={styles.statsContainer}>
        <StatsData label='Steps' value={stepCount.toString()} />
        <StatsData label='Distance' value={`${(distance / 1000).toFixed()} km`} />
        <StatsData label='flights climbed' value={flightClimbed.toString()} />
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
