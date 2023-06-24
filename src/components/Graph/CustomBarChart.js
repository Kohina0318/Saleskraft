import React from 'react'
import { Text,View } from 'react-native'

const CustomBarChart = () => {

    const data = [
        {
            id: 1,
            loginTime: "45",
            day: "Monday"
        },
        {
            id: 2,
            loginTime: "30",
            day: "Tuesday"
        },
        {
            id: 3,
            loginTime: "424",
            day: "Wednesday"
        },
        {
            id: 4,
            loginTime: "120",
            day: "Thursday"
        }
    ]

    const dataLength = data.map((item, index) => index)

    return (
        <View style={{height:500,backgroundColor:'green',alignContent:'center',alignItems:'center',top:50}}>

       
        <View style={{ flexDirection: "row",alignItems:'flex-end' }}>
            {data.map((item, index) => {
                return (<View key={index} style={{
                    flexDirection: "column",
                    alignItems: 'center',
                    margin: 5
                }}>
                    <Text>{item.loginTime}</Text>
                    <View style={{
                        width: 23,
                        height: item.loginTime / dataLength.length,
                        backgroundColor: 'red'
                    }} />
                    <Text>{item.day}</Text>
                </View>)
            })}
        </View>
        </View>
    )
}


export default CustomBarChart
