// @flow
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Subtitle,
  Button,
  View,
  Screen,
  Heading,
  Text,
  TextInput,
  Switch,
  Tile,
  Divider,
  TouchableOpacity,
  Title,
  InlineGallery
} from '@shoutem/ui';
import CustomPicker from './utils/picker';
import ActivityCard from './activity-card';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'react-native-firebase';

type State = {
  author: string,
  category: {
    name: string,
    value: number
  },
  description: string,
  end: Date,
  images: Array<string>,
  coordinate: {
    // @TODO: rename to location
    latitude: number,
    longitude: number
  },
  name: string,
  start: Date,

  //View - based variables
  dateTimePickerStartVisible: boolean,
  dateTimePickerEndVisible: boolean,
  previewVisible: boolean,
  selectVisible: boolean,
  imagesPickerVisible: boolean,
  newImageUrl: string
};

type Props = {
  navigation: Object,
  addActivity: (state: Object<>) => void
};

const borderStyles = {
  borderColor: '#eee',
  borderRadius: 15,
  borderWidth: 2
};

class ActivityForm extends Component<Props, State> {
  state = {
    author: 'Admin',
    category: {
      // @TODO: map to string
      name: 'Wydarzenie kulturalne',
      value: 1
    },
    description:
      "Test - world's most anticipated event of century will take place in Russia, featuring the best players in the world like: Ronadlinho, Puson. Come and see them live!",
    end: new Date(),
    images: [
      'https://shoutem.github.io/static/getting-started/restaurant-1.jpg',
      'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'
    ],
    // @TODO: map coordinates into location name
    coordinate: {
      latitude: 51.2365,
      longitude: 22.5584
    },
    name: 'Test - World Championship 2018',
    start: new Date(),

    //UI Based constants
    previewVisible: true,
    selectVisible: false,
    dateTimePickerStartVisible: false,
    dateTimePickerEndVisible: false,
    imagesPickerVisible: false,
    newImageUrl: ''
  };

  ref = firebase.firestore().collection('Events');
  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate(querySnapshot) {
    console.log(querySnapshot);
  }

  addNewEvent(event) {
    const firebaseEvent = {
      author: 'testAuthor',
      category: event.category.name,
      description: event.description,
      end: event.end,
      images: event.images,
      location: event.coordinate,
      name: event.name,
      start: event.start,
      peopleGoing: 0,
      peopleInterested: 1 // i'm always interested :)
    };

    console.log(
      'Adding new Event to Events collection in firestore: ',
      firebaseEvent
    );
    this.ref.add(firebaseEvent);
  }

  /*
    Structure of single activity:
   - Name of activity
   - Description
   - Time
   - Category
   - Location (Google Maps)
   */

  pickerOptions = [
    {
      name: 'Wydarzenie kulturalne',
      value: 1
    },
    {
      name: 'Turniej futbolowy',
      value: 2
    },
    {
      name: 'Przegląd talentów',
      value: 3
    },
    {
      name: 'Meetup IT',
      value: 4
    }
  ];

  _showDateTimePickerStart = () => {
    this.setState(state => ({ ...state, dateTimePickerStartVisible: true }));
  };

  _hideDateTimePickerStart = () => {
    this.setState(state => ({ ...state, dateTimePickerStartVisible: false }));
  };

  _handleStartDatePicked = date => {
    if (!date) return;
    this.setState(state => ({
      ...state,
      start: date
    }));
    this._hideDateTimePickerStart();
  };

  _showDateTimePickerEnd = () => {
    this.setState(state => ({ ...state, dateTimePickerEndVisible: true }));
  };

  _hideDateTimePickerEnd = () => {
    this.setState(state => ({ ...state, dateTimePickerEndVisible: false }));
  };

  _handleEndDatePicked = date => {
    if (!date) return;
    this.setState(state => ({
      ...state,
      start: date
    }));
    this._hideDateTimePickerEnd();
  };

  initialCoordinates = {
    latitude: 51.2465,
    longitude: 22.5684,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0221
  };

  addImage() {
    if (
      !this.state.newImageUrl ||
      this.state.images.some(image => image === this.state.newImageUrl)
    ) {
      return;
    }
    this.setState(state => ({
      ...state,
      images: [...state.images, state.newImageUrl],
      newImageUrl: ''
    }));
  }

  render() {
    const props = this.props.navigation.state.params;
    const navigation = this.props.navigation;
    const imagesData = this.state.images.map(image => ({
      source: {
        uri: image
      }
    }));
    return (
      <Screen>
        <ScrollView>
          <Tile style={{ margin: 10 }}>
            <Subtitle style={{ margin: 10 }} styleName={'h-center'}>
              Name
            </Subtitle>
            <TextInput
              placeholder={'Name of event'}
              onChangeText={name =>
                this.setState(state => ({ ...state, name }))
              }
            />
            <Subtitle styleName={'h-center'} style={{ margin: 10 }}>
              Description
            </Subtitle>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description of event'}
              onChangeText={description =>
                this.setState(state => ({ ...state, description }))
              }
              autoCorrect={false}
            />
            <Divider styleName="line" />
            <View style={{ marginVertical: 15 }}>
              <Subtitle style={{ marginVertical: 15 }}>
                {' '}
                Dates of events:{' '}
              </Subtitle>
              <TouchableOpacity onPress={this._showDateTimePickerStart}>
                <Text style={{ margin: 5 }}>
                  Starts at: {this.state.start.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._showDateTimePickerEnd}>
                <Text style={{ margin: 5 }}>
                  Ends at: {this.state.end.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
          </Tile>
          <View styleName="content horizontal space-between">
            <View style={{ margin: 15 }}>
              <Button
                onPress={value =>
                  this.setState(state => ({ ...state, selectVisible: true }))
                }
              >
                <Text>Choose category</Text>
              </Button>
            </View>
            <View style={{ margin: 15, marginRight: 30 }}>
              <Subtitle>Show preview</Subtitle>
              <Switch
                value={this.state.previewVisible}
                onValueChange={value =>
                  this.setState(state => ({ ...state, previewVisible: value }))
                }
              />
            </View>
          </View>
          <Tile style={{ margin: 10, padding: 15 }}>
            <Title> Coordinates</Title>
            <Subtitle>Actual coordinates of event:</Subtitle>
            <Text>Latitude: {this.state.coordinate.latitude}</Text>
            <Text>Longtitude: {this.state.coordinate.longitude}</Text>
            <Button
              styleName="full-width"
              style={{ ...borderStyles }}
              onPress={() => {
                navigation.navigate('ActivityMap', {
                  coordinates: this.initialCoordinates,
                  markers: [
                    {
                      coordinate: this.state.coordinate,
                      title: this.state.name,
                      description: this.state.description
                    }
                  ],
                  setCoordinates: coordinates => {
                    console.log('setting some new coordinates: ', coordinates);
                    this.setState(state => ({
                      ...state,
                      coordinate: coordinates
                    }));
                  }
                });
              }}
            >
              <Text>Choose location</Text>
            </Button>
          </Tile>

          <Tile style={{ margin: 10, padding: 15 }}>
            <Title>Images of event: </Title>
            <Button
              styleName="full-width"
              style={{
                ...borderStyles,
                marginVertical: 15,
                paddingVertical: 5
              }}
              onPress={value =>
                this.setState(state => ({
                  ...state,
                  imagesPickerVisible: true
                }))
              }
            >
              <Text>Choose images!</Text>
            </Button>
            <Subtitle>Enter url of image for event: </Subtitle>
            <TextInput
              autoCorrect={false}
              placeholder={'Url of image...'}
              onChangeText={newImageUrl =>
                this.setState(state => ({ ...state, newImageUrl }))
              }
            />
            <Button
              style={{ ...borderStyles }}
              styleName="full-width"
              onPress={this.addImage.bind(this)}
            >
              <Text>Add image by URL</Text>
            </Button>
            {this.state.images.length && (
              <Subtitle style={{ margin: 10 }}>
                Images you choose for event:
              </Subtitle>
            )}
          </Tile>
          {this.state.images.length && <InlineGallery data={imagesData} />}

          <DateTimePicker
            isVisible={this.state.dateTimePickerStartVisible}
            minimumDate={new Date()}
            onConfirm={this._handleStartDatePicked}
            onCancel={this._hideDateTimePickerStart}
            mode={'datetime'}
            is24Hour={true}
          />
          <DateTimePicker
            minimumDate={new Date()}
            isVisible={this.state.dateTimePickerEndVisible}
            onConfirm={this._handleEndDatePicked}
            onCancel={this._hideDateTimePickerEnd}
            mode={'datetime'}
            is24Hour={true}
          />
          {this.state.selectVisible && (
            <View
              styleName="fill-parent"
              style={{ margin: 15, backgroundColor: 'white' }}
            >
              <Button
                onPress={() =>
                  this.setState(state => ({ ...state, selectVisible: false }))
                }
              >
                <Text>Done</Text>
              </Button>
              <CustomPicker
                options={this.pickerOptions}
                onValueChange={(itemValue, itemIndex) => {
                  const category = this.pickerOptions.find(
                    option => itemValue === option.value
                  );
                  this.setState(state => ({
                    ...state,
                    category
                  }));
                }}
                selectedValue={this.state.category.value}
              />
            </View>
          )}
          {this.state.imagesPickerVisible && (
            <View
              styleName="fill-parent"
              style={{ margin: 15, backgroundColor: 'white' }}
            >
              <Button
                onPress={() =>
                  this.setState(state => ({
                    ...state,
                    imagesPickerVisible: false
                  }))
                }
              >
                <Text>Done</Text>
              </Button>
              <Text>Images will be here!</Text>
            </View>
          )}
          {this.state.previewVisible && <ActivityCard {...this.state} />}
        </ScrollView>
        <Button
          style={{ margin: 10 }}
          onPress={() => {
            this.addNewEvent(this.state);
            props.addItem(this.state);
            navigation.goBack();
            // @TODO: add event to firestore here
            // @TODO: get and set proper UUID!
          }}
        >
          <Text>Add event</Text>
        </Button>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    height: 600
  },
  input: {
    margin: 5
  },
  label: {
    color: '#575757',
    fontSize: 11
  },
  header: {
    textAlign: 'center',
    fontSize: 25
  }
});

export default ActivityForm;
