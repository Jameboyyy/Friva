import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/authScreen';
import { RootParamList } from './types';

const Stack = createStackNavigator<RootParamList>();

const AppNavigator = () => {
  console.log('AppNavigator is rendering');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
