
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import appleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';
import { initialize, readRecords, requestPermission } from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

type useHealthDataType = {
    stepCount: number,
    flightClimbed: number,
    distance: number,
    progress: number,
}

type useHealthDataProps = {
    date: Date,
}

const STEPS_GOAL = 7500;

const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            appleHealthKit.Constants.Permissions.Steps,
            appleHealthKit.Constants.Permissions.DistanceWalkingRunning,
            appleHealthKit.Constants.Permissions.FlightsClimbed
        ],
        write: []
    }
}

const useHealthData = (props: useHealthDataProps): useHealthDataType => {
    const { date } = props;

    const [hasPermissions, setHasPermissions] = useState(false);
    const [stepCount, setStepCount] = useState(0);
    const [flightClimbed, setFlightClimbed] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (Platform.OS !== 'ios') {
            return
        }

        appleHealthKit.isAvailable((error, result) => {
            if (!result || error) {
                console.log('HealthKit is not available');
                return;
            }

            appleHealthKit.initHealthKit(permissions, (err) => {
                if (err) {
                    console.log('Failed to initialize HealthKit', err);
                    return;
                }

                setHasPermissions(true);
            });
        });
    }, [])

    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const options: HealthInputOptions = {
            date: date.toISOString(),
            includeManuallyAdded: false,
        }

        appleHealthKit.getStepCount(options, (err, result) => {
            if (err) {
                console.log('Failed to get step count', err);
                return;
            }

            console.log('Step count:', result.value);
            setStepCount(result.value);
        })

        appleHealthKit.getFlightsClimbed(options, (err, result) => {
            if (err) {
                console.log('Failed to get flights climbed', err);
                return;
            }

            console.log('Flights climbed:', result.value);
            setFlightClimbed(result.value);
        })

        appleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
            if (err) {
                console.log('Failed to get distance', err);
                return;
            }

            console.log('Distance:', result.value);
            setDistance(result.value);
        })
    }, [hasPermissions])

    // Android
    const readSampleData = async () => {
        const isInitialized = await initialize();

        if (!isInitialized) {
            return;
        }

        // request permissions
        try {
            await requestPermission([
                { accessType: 'read', recordType: 'Steps' },
                { accessType: 'read', recordType: 'Distance' },
            ]);
        } catch (error) {
            console.error("Erro ao solicitar permissões: ", error);
        }

        const timeRangeFilter: TimeRangeFilter = {
            operator: 'between',
            startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
            endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
        };

        // Steps
        const stepsData = await readRecords('Steps', { timeRangeFilter });
        const totalSteps = stepsData.records
            ? stepsData.records.reduce((sum, cur) => sum + cur.count, 0)
            : 0; // Se records não estiver presente, o total será 0
        setStepCount(totalSteps);

        // Distance
        const distanceData = await readRecords('Distance', { timeRangeFilter });
        const totalDistance = distanceData.records
            ? distanceData.records.reduce(
                (sum, cur) => sum + cur.distance.inMeters,
                0
            )
            : 0; // Se records não estiver presente, o total será 0
        setDistance(totalDistance);
    }

    useEffect(() => {
        if (Platform.OS === 'android') {
            readSampleData();
        }
    }, [])

    return {
        stepCount,
        flightClimbed,
        distance,
        progress: stepCount / STEPS_GOAL,
    }
};

export default useHealthData;