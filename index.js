import { registerRootComponent } from 'expo';

import Router from './route';
import Toast from 'react-native-toast-message';
import Notification from './components/Notification/Notification';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Router);
