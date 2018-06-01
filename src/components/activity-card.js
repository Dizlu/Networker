// @flow
import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Divider, Tile, Title, Caption, View } from '@shoutem/ui';

type Props = {
  img?: string,
  name: string,
  category: number,
  description: string,
  uuid: string,
  start: Date,
  end: Date,
  pubDate?: Date,
  goToDetail?: (props: Props) => void
};

const ActivityCard = (props: Props) => {
  const { name, description, goToDetail } = props;

  const date = props.pubDate ? props.pubDate : props.start;
  return (
    <TouchableHighlight onPress={() => goToDetail && goToDetail(props)}>
      <Tile>
        <View styleName="content">
          <Title styleName="md-gutter-top">{name}</Title>
          <View styleName="horizontal space-between">
            <Caption>
              {' '}
              {description && description.length > 100
                ? description.slice(0, 100).trim() + '...'
                : description}{' '}
            </Caption>
          </View>
          <View styleName="horizontal space-between">
            <Caption>
              {' '}
              {(props.category && props.category) || 'Brak kategorii'}{' '}
            </Caption>
            <Caption>
              {'Start: '}
              {new Date(date).toLocaleDateString()} -{' '}
              {new Date(date).toLocaleTimeString()}{' '}
            </Caption>
          </View>
        </View>
      </Tile>
    </TouchableHighlight>
  );
};

export default ActivityCard;
