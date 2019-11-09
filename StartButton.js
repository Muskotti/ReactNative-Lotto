import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
export default class StartButtons extends Component {

    getStyle = (data) => {
        if(data === 'disapled'){
            return styles.disabledButton
        } else if(data === 'stop') {
            return styles.stopButton
        } else if(data === 'start') {
            return styles.startButton
        }  else if(data === 'win') {
            return styles.winButton
        }
    }

    text = (data) => {
        if(data === 'disapled'){
            return 'Select Numbers'
        } else if(data === 'stop') {
            return 'Stop'
        } else if(data === 'start') {
            return 'Start'
        } else if(data === 'win') {
            return 'YOU WIN!'
        }
    }

    render() {
        return (
            <TouchableOpacity onPress = {() => this.props.lottoStatus()}>
                <View style = {this.getStyle(this.props.enabled)}>
                    <Text style = {{color: 'white', fontSize: 20}}>{this.text(this.props.enabled)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    startButton: {
        marginBottom: 24,
        backgroundColor: 'blue', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 200,
        height: 50,
    },
    stopButton: {
        marginBottom: 24,
        backgroundColor: 'red', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 200,
        height: 50,
    },
    disabledButton: {
        marginBottom: 24,
        backgroundColor: 'gray', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 200,
        height: 50,
    },
    winButton: {
        marginBottom: 24,
        backgroundColor: 'gold', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 200,
        height: 50,
    },
});