/**
 * @flow
 */
import { StackNavigator } from "react-navigation";
import Profile from "./src/components/profile";
import EventForm from "./src/components/event-form";
import EventDetail from "./src/components/event-detail/main";
import Category from "./src/components/views/Category";


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
    }
  },
  {
    initialRouteName: "Home"
  }
);
