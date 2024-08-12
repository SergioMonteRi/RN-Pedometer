import { View } from 'react-native'
import React, { useEffect } from 'react'

import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import RingProgressStyles from './styles';

type RingProgressProps = {
    radius?: number;
    strokeWidth?: number;
    progress: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const RingProgress = (props: RingProgressProps) => {
    const { radius = 100, strokeWidth = 40, progress } = props;

    const fill = useSharedValue(0);

    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * fill.value, circumference]
    }))

    const styles = RingProgressStyles(radius);

    useEffect(() => {
        fill.value = withTiming(progress, { duration: 1500});
    }, [progress])

    return (
        <View style={styles.container}>
            <Svg>
                {/* Background */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    strokeWidth={strokeWidth}
                    stroke={"#EE0F55"}
                    fill={"none"}
                    opacity={0.2}
                />

                <AnimatedCircle
                    animatedProps={animatedProps}
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    fill={"none"}
                    strokeWidth={strokeWidth}
                    stroke={"#EE0F55"}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${radius}, ${radius}`}
                />
            </Svg>
        </View>
    )
}

export default RingProgress