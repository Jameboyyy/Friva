import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/authScreen';
import Step1Screen from '../screens/signUp/step1Screen';






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
        <Stack.Screen name="Step1Screen" component={Step1Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
