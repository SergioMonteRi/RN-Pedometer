import { View, Text } from 'react-native'
import React from 'react'

import Svg, { Circle, Rect } from 'react-native-svg';

import RingProgressStyles from './styles';

type RingProgressProps = {
    radius?: number;
    strokeWidth?: number;
    progress: number;
}

const RingProgress = (props: RingProgressProps) => {
    const { radius = 100, strokeWidth = 40, progress } = props;

    const styles = RingProgressStyles(radius);

    const innerRadius = radius - strokeWidth / 2;

    const circumference = 2 * Math.PI * innerRadius;

    return (
        <View style={styles.container}>
            <Svg>
                {/* Background */}
                <Circle
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                    stroke={"#EE0F55"}

                />

                <Circle
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
                    originX={radius}
                    originY={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={[circumference * progress, circumference]}
                    stroke={"#EE0F55"}
                    strokeLinecap='round'
                    rotation={"-90"}
                />
            </Svg>
        </View>
    )
}

export default RingProgress