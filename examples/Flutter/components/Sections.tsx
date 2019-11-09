import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Headers from "./Headers";
import Pages from "./Pages";
import { Section, SMALL_HEADER_HEIGHT } from "./Model";

const { Value, event } = Animated;
const { width, height } = Dimensions.get("window");

type SectionsProps = {
  sections: Section[];
};

const onScroll = (contentOffset: {
  x?: Animated.Node<number>;
  y?: Animated.Node<number>;
}) =>
  event(
    [
      {
        nativeEvent: {
          contentOffset,
        },
      },
    ],
    { useNativeDriver: true },
  );

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
    this.x = new Value(0);
    this.y = new Value(0);
    this.onScrollX = onScroll({ x: this.x });
    this.onScrollY = onScroll({ y: this.y });
  }

  x: Animated.Value<number>;
  y: Animated.Value<number>;
  onScrollX: any;
  onScrollY: any;

  render() {
    const { x, y, onScrollX, onScrollY } = this;
    const { sections } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Headers {...{ sections, y, x }} />
          <Pages {...{ sections, y, x }} />
        </View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onScrollY}
          bounces={false}
          contentContainerStyle={{
            height: height + height - SMALL_HEADER_HEIGHT,
          }}>
          <Animated.ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScrollX}
            bounces={false}
            contentContainerStyle={{ width: width * sections.length }}
            snapToInterval={width}
            decelerationRate="fast"
            horizontal
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
