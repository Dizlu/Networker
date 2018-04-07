// @flow
import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Tile, Title, Caption, View } from '@shoutem/ui'

type Props = {
  img?: string,
  name: string,
  description: string,
  uuid: string,
  goToDetail?: (props: Props) => void
}

const ActivityCard = (props: Props) => {
  const { img, name, description, uuid, goToDetail } = props;

  return (<TouchableHighlight onPress={() => goToDetail && goToDetail({img, name, description, uuid})}>
      <Tile>
        <View styleName="content">
          <Title styleName="md-gutter-top">{name}</Title>
          <View styleName="horizontal space-between">
            <Caption> {description.length > 100 ? description.slice(0, 100).trim() + '...' : description} </Caption>
          </View>
          <View styleName="horizontal space-between">
            <Caption> Kategoria </Caption>
            <Caption> 15:34 </Caption>
          </View>
        </View>
      </Tile>
    </TouchableHighlight>
  );
}


export default ActivityCard;
