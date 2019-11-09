import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native'
export default class Result extends Component {
    render() {
        return (
            <Text style={styles.text}>You got {this.props.result} correct, it took {this.props.years} years</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
      marginBottom: 50,
    },
});