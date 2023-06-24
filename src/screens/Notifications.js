import { StyleSheet, Text, View, } from 'react-native'
import React, { useEffect } from 'react'
import Header_2 from '../components/shared/Header_2'
import { gettripLocationApi } from '../repository/trip/tripRepository'

const Notifications = (props) => {

  const [actionData, setActionData] = useState([])

  const getNotification = async () => {
    const result = await gettripLocationApi(`api/getNotification`)
    if (result.statusCode == 200) {
      setActionData(result.data.Actions.actions)
    }
  }

  useEffect(() => {
    getNotification()
  }, [])

  return (
    <View>
      <Header_2 title='Notifications' onPress={() => props.navigation.goBack()} />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})