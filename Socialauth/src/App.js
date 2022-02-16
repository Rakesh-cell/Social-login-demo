/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

const App = () => {

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={{ justifyContent: 'center', }}>
          <Text style={{ alignItems: 'center' }}> Hello World</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default App;
