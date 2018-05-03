/**
 * @flow
 */
import { StackNavigator } from "react-navigation";
import Profile from "./src/components/profile";
import EventForm from "./src/components/event-form";
import EventDetail from "./src/components/event-detail/event-detail";
import Category from "./src/components/views/category";
import ActivityMap from "./src/components/activity-map";


export default StackNavigator(
  {
    Home: {
      screen: Category
    },
    Profile: {
      screen: Profile
    },
    EventForm: {
      screen: EventForm
    },
    EventDetail: {
      screen: EventDetail
    },
    ActivityMap: {
      screen: ActivityMap
    }
  },
  {
    initialRouteName: "Home"
  }
);
