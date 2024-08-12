import { View, Text } from 'react-native'
import React from 'react'

import statsDataStyles from './styles'

type Props = {
    label: string,
    value: string
}

const StatsData = (props: Props) => {
    const { label, value } = props;

    return (
        <View>
            <Text style={statsDataStyles.label}>{label}</Text>
            <Text style={statsDataStyles.value}>{value}</Text>
        </View>
    )
}

export default StatsData;