import { StyleSheet, Text } from 'react-native';
import React from 'react';

type TProps = {
  children: React.ReactNode;
};

export default function ScreenHeader(props: TProps) {
  return <Text style={styles.headerText}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
