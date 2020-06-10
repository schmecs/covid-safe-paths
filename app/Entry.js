import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import isOnboardingCompleteSelector from './store/selectors/isOnboardingCompleteSelector';
import AboutScreen from './views/About';
import ChooseProviderScreen from './views/ChooseProvider';
import {
  ExportCodeInput,
  ExportComplete,
  ExportConfirmUpload,
  ExportLocally,
  ExportLocationConsent,
  ExportPublishConsent,
  ExportSelectHA,
  ExportStart,
} from './views/Export';
import { ExposureHistoryScreen } from './views/ExposureHistory/ExposureHistory';
import {
  FEATURE_FLAG_SCREEN_NAME,
  FeatureFlagsScreen,
} from './views/FeatureFlagToggles';
import {
  EN_DEBUG_MENU_SCREEN_NAME,
  EN_LOCAL_DIAGNOSIS_KEYS_SCREEN_NAME,
  ENDebugMenu,
} from './views/Settings/ENDebugMenu';
import ImportScreen from './views/Import';
import { LicensesScreen } from './views/Licenses';
import { Main } from './views/Main';
import NewsScreen from './views/News';
import { EnableExposureNotifications } from './views/onboarding/EnableExposureNotifications';
import Onboarding1 from './views/onboarding/Onboarding1';
import Onboarding2 from './views/onboarding/Onboarding2';
import Onboarding3 from './views/onboarding/Onboarding3';
import Onboarding4 from './views/onboarding/Onboarding4';
import { OnboardingPermissions } from './views/onboarding/OnboardingPermissions';
import { SettingsScreen } from './views/Settings';
import { ENLocalDiagnosisKeyScreen } from './views/Settings/ENLocalDiagnosisKeyScreen';

const Stack = createStackNavigator();

const fade = ({ current }) => ({ cardStyle: { opacity: current.progress } });

const SCREEN_OPTIONS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle: {
    backgroundColor: 'transparent', // prevent white flash on Android
  },
  headerShown: false,
};

const ExportStack = () => (
  <Stack.Navigator
    mode='modal'
    screenOptions={{
      ...SCREEN_OPTIONS,
      cardStyleInterpolator: fade,
      gestureEnabled: false,
    }}>
    <Stack.Screen name='ExportStart' component={ExportStart} />
    <Stack.Screen name='ExportSelectHA' component={ExportSelectHA} />
    <Stack.Screen name='ExportCodeInput' component={ExportCodeInput} />
    <Stack.Screen
      name='ExportLocationConsent'
      component={ExportLocationConsent}
    />
    <Stack.Screen
      name='ExportPublishConsent'
      component={ExportPublishConsent}
    />
    <Stack.Screen name='ExportConfirmUpload' component={ExportConfirmUpload} />
    <Stack.Screen name='ExportDone' component={ExportCodeInput} />
    <Stack.Screen name='ExportComplete' component={ExportComplete} />
  </Stack.Navigator>
);

const MainApp = () => (
  <Stack.Navigator initialRouteName='Main' screenOptions={SCREEN_OPTIONS}>
    <Stack.Screen name='Main' component={Main} />
    <Stack.Screen name='NewsScreen' component={NewsScreen} />
    <Stack.Screen
      name='ExportScreen'
      component={ExportStack}
      options={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
    {/* We feature flag in settings between whether to send to route or e2e export */}
    <Stack.Screen name='ExportLocally' component={ExportLocally} />
    <Stack.Screen name='ImportScreen' component={ImportScreen} />
    <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
    <Stack.Screen
      name='ChooseProviderScreen'
      component={ChooseProviderScreen}
    />
    <Stack.Screen name='LicensesScreen' component={LicensesScreen} />
    <Stack.Screen
      name='ExposureHistoryScreen'
      component={ExposureHistoryScreen}
    />
    <Stack.Screen name='AboutScreen' component={AboutScreen} />
    <Stack.Screen name={EN_DEBUG_MENU_SCREEN_NAME} component={ENDebugMenu} />
    <Stack.Screen
      name={EN_LOCAL_DIAGNOSIS_KEYS_SCREEN_NAME}
      component={ENLocalDiagnosisKeyScreen}
    />
    <Stack.Screen
      name={FEATURE_FLAG_SCREEN_NAME}
      component={FeatureFlagsScreen}
    />
  </Stack.Navigator>
);

// const OnboardingStack = () => (
//   <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
//     <Stack.Screen name='Onboarding1' component={Onboarding1} />
//     <Stack.Screen name='Onboarding2' component={Onboarding2} />
//     <Stack.Screen name='Onboarding3' component={Onboarding3} />
//     <Stack.Screen name='Onboarding4' component={Onboarding4} />
//     <Stack.Screen
//       name='OnboardingPermissions'
//       component={OnboardingPermissions}
//     />
//     <Stack.Screen
//       name='EnableExposureNotifications'
//       component={EnableExposureNotifications}
//     />
//   </Stack.Navigator>
// );

export const Entry = () => {
  // const onboardingComplete = useSelector(isOnboardingCompleteSelector);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
        <Stack.Screen name={'App'} component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// {onboardingComplete ? (
// ) : (
// <Stack.Screen name={'Onboarding'} component={OnboardingStack} />
// )}
