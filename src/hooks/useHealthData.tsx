
import { useEffect, useState } from 'react';
import appleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit } from 'react-native-health';

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
        appleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log('Failed to initialize HealthKit', err);
                return;
            }

            setHasPermissions(true);
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

    return {
        stepCount,
        flightClimbed,
        distance,
        progress: stepCount / STEPS_GOAL,
    }
};

export default useHealthData;