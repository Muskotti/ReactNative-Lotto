import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Button} from 'react-native'

export default class Buttons extends Component {

    constructor(props){
        super(props)
        this.state = {
            buttons: [],
            length: 0,
            clicked: [],
            savedButtons: []
        }
    }

    componentDidMount(){
        this.makeList()
    }

    makeList = () => {
        var buttons = [];

        for(let i = 0; i < 40; i++){
            buttons.push(
                this.getButton(i + 1, 'empty')
            )
        }
        this.setState({buttons})
    }

    click = (data) => {
        let index = data - 1
        let newButtons = [...this.state.buttons]
        let buttonList = [...this.state.clicked]
        if(this.state.length < 7 && !this.state.clicked.includes(index)) {
            newButtons[index] = this.getButton(data, 'selected')
            buttonList.push(index)
            this.setState(prevState  =>({
                buttons: newButtons, 
                length: prevState.length + 1,
                clicked: buttonList
            }), () => {
                this.props.setLength(this.state.length)
                if(this.state.length === 7) {
                    this.props.setNumbers(this.state.clicked)
                    this.setState({savedButtons: this.state.buttons})
                }
            })
        } else if(this.state.clicked.includes(index)) {
            newButtons[index] = this.getButton(data, 'empty')
            let x = buttonList.indexOf(index)
            buttonList.splice(x,1)
            this.setState(prevState  =>({
                buttons: newButtons, 
                length: prevState.length - 1,
                clicked: buttonList
            }), () => {
                this.props.setLength(this.state.length)
            })
        }
    }

    getStyle = (data) => {
        if(data === 'empty'){
            return styles.emptyButton
        } else if(data === 'selected') {
            return styles.selectedButton
        } else if(data === 'lotto') {
            return styles.lottoButton
        }
    }

    getButton = (data, info) => {
        return (
            <View key ={data} status={info}>
                <TouchableOpacity onPress = {() => this.click(data)}>
                        <View style={this.getStyle(info)}>
                            <Text style={{color: 'white'}}>{data}</Text>
                        </View>
                </TouchableOpacity>
            </View>
        );
    }

    setLotto = () => {
        let newButtons = [...this.state.savedButtons]

        this.props.lottoNumbers.forEach((item) => {
            newButtons[item] = this.getButton(item + 1, 'lotto')
        })

        this.setState({
            buttons: newButtons
        })
    }

    render() {
        return (
            <View style={styles.listView}>
                { this.state.buttons }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        margin: 12,
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyButton:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        height: 55,
        width: 55, 
        borderRadius:110, 
        backgroundColor:'grey',
    },
    selectedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        height: 55,
        width: 55, 
        borderRadius:110, 
        backgroundColor:'blue',
    },
    lottoButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        height: 55,
        width: 55, 
        borderRadius:110, 
        backgroundColor:'red',
    }
});