import { View } from 'react-native'
import React, { useEffect } from 'react'

import Svg, { Circle, CircleProps } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';

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

    const circleProps: CircleProps = {
        cx: radius,
        cy: radius,
        r: innerRadius,
        strokeWidth: strokeWidth,
        stroke: "#3274F0",
        fill: "none",
    }

    const styles = RingProgressStyles(radius, strokeWidth);

    useEffect(() => {
        fill.value = withTiming(progress, { duration: 1500 });
    }, [progress])

    return (
        <View style={styles.container}>
            <Svg>
                {/* Background */}
                <Circle
                    {...circleProps}
                    opacity={0.2}
                />

                <AnimatedCircle
                    {...circleProps}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${radius}, ${radius}`}
                />
            </Svg>
            <AntDesign name="arrowright" size={strokeWidth * 0.8} color="black" style={styles.arrow}/>
        </View>
    )
}

export default RingProgress