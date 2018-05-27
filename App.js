/**
 * @flow
 */
import { StackNavigator } from 'react-navigation';
import ActivityMap from './src/components/activity-map';
import EventDetail from './src/components/event-detail/event-detail';
import Profile from './src/components/profile';
import Category from './src/components/views/category';
import { LogIn } from './src/components/authentication/log-in';
import ActivityForm from './src/components/activity-form';

export default StackNavigator(
  {
    Login: {
      screen: LogIn
    },
    Home: {
      screen: Category
    },
    Profile: {
      screen: Profile
    },
    EventForm: {
      screen: ActivityForm
    },
    EventDetail: {
      screen: EventDetail
    },
    ActivityMap: {
      screen: ActivityMap
    }
  },
  {
    initialRouteName: 'Home'
  }
);
