import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import Fluid from 'react-native-fluid-transitions';
import {Chevron} from './Chevron';
import Item, {ListItem} from './ListItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    overflow: 'hidden',
  },
  headerActive: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerInactive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  listInactive: {
    opacity: 0,
    height: 0,
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

export function List({list}: ListProps) {
  const [open, setOpen] = useState(false);

  const listActiveStyle = useMemo(
    () => ({opacity: 1, height: 54 * list.items.length}),
    [],
  );

  return (
    <Fluid.View>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(prev => !prev);
        }}>
        <Fluid.View
          staticStyle={styles.container}
          style={open ? styles.headerInactive : styles.headerActive}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron active={open} />
        </Fluid.View>
      </TouchableWithoutFeedback>

      <Fluid.View
        staticStyle={styles.items}
        style={open ? listActiveStyle : styles.listInactive}>
        {list.items.map((item, key) => (
          <Item {...{item, key}} isLast={key === list.items.length - 1} />
        ))}
      </Fluid.View>
    </Fluid.View>
  );
}
