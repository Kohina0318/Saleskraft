import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
// import Constants from 'expo-constants';
// import ComponentWithError from './ComponentWithError'

const ChildrenThatCouldThrowEror = () => {
  const [isErrorComponentVisible, setIsErrorComponentVisible] = React.useState(false)

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text style={styles.icon}>🐛</Text>
        <Text style={styles.title}>
          react-native-error-boundary
        </Text>
        <Text style={styles.text}>
          Click on the following button to render a component that will throw an error.
        </Text>
        <Button title='Throw error' onPress={() => setIsErrorComponentVisible(true)} />
        {isErrorComponentVisible && 
        <Text>Error</Text>
        // <ComponentWithError />
        }
      </View>
    </ErrorBoundary>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48
  },
  text: {
    marginVertical: 16
  }
});

export default ChildrenThatCouldThrowEror