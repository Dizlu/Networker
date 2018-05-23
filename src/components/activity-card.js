// @flow
import React from "react";
import { TouchableHighlight } from "react-native";
import { Tile, Title, Caption, View } from "@shoutem/ui";

type Props = {
  img?: string,
  name: string,
  category: number,
  description: string,
  uuid: string,
  pubDate: Date,
  goToDetail?: (props: Props) => void
};

const ActivityCard = (props: Props) => {
  const { name, description, goToDetail } = props;

  return (
    <TouchableHighlight onPress={() => goToDetail && goToDetail(props)}>
      <Tile>
        <View styleName="content">
          <Title styleName="md-gutter-top">{name}</Title>
          <View styleName="horizontal space-between">
            <Caption>
              {" "}
              {description.length > 100
                ? description.slice(0, 100).trim() + "..."
                : description}{" "}
            </Caption>
          </View>
          <View styleName="horizontal space-between">
            <Caption> {props.category || "Wydarzenie"} </Caption>
            <Caption>
              {" "}
              {new Date(props.pubDate).toLocaleDateString()} -{" "}
              {new Date(props.pubDate).toLocaleTimeString()}{" "}
            </Caption>
          </View>
        </View>
      </Tile>
    </TouchableHighlight>
  );
};

export default ActivityCard;
