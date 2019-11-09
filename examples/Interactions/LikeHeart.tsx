import React, { useState } from "react";
import { StyleSheet, View, TextStyle } from "react-native";
import Fluid, { createFluidComponent } from "react-native-fluid-transitions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconProps } from "react-native-vector-icons/Icon";
import { ColorA } from "../colors";

const FluidIcon = createFluidComponent<IconProps, TextStyle>(Icon, false);

const LikeHeart = () => {
  const [likes, setLikes] = useState(0);
  const state = { name: "likes", active: true, value: likes };
  const onLike = () => setLikes(l => l + 1);
  const config = Fluid.createConfig({
    onEnter: {
      state: "likes",
      interpolation: {
        styleKey: "transform.scale",
        outputRange: [1, 1.5, 1],
      },
      animation: Fluid.Animations.Springs.Gentle,
    },
  });
  return (
    <View style={styles.container}>
      <FluidIcon
        onPress={onLike}
        states={state}
        config={config}
        name="heart"
        size={36}
        color={ColorA}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
  },
});

export { LikeHeart };
