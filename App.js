import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Buttons from './Buttons';
import StartButton from './StartButton';
import Result from './Result';

export default class App extends Component {

  constructor(props){
    super(props)
    this.setLotto = React.createRef();
    this.state = {
        length: 0,
        status: 'disapled',
        result: 0,
        years: 0,
        numbers: [],
        weeks: 0,
        lottoNumbers: [],
        win: false
    }
  }

  setLength = (data) => {
    if(data === 7) {
      this.setState({length: data, status: 'start'})
    } else {
      clearInterval(this._interval);
      this.setState({length: data, status: 'disapled', weeks: 0, years: 0, result: 0})
    }
  }

  setLottoStatus = () => {
      if(this.state.status === 'start') {
        this.setState({status:'stop'})
        this._interval = setInterval(() => {
          this.generateNumbers()
        }, 100);
      } else if(this.state.status === 'stop') {
        this.setLotto.current.setLotto()
        this.checkWin()
        this.setState({status:'start'})
        clearInterval(this._interval);
      } else if(this.state.status === 'win') {
        this.setLotto.current.setLotto()
        clearInterval(this._interval);
      }
  }

  checkWin = () => {
    var x = 0

    this.state.lottoNumbers.forEach((item) =>{
      this.state.numbers.forEach((data) => {
        if(item == data) {
          x++
        }
      })
    })
    this.setState({result: x})

    if(x === 7 && !this.state.win) {
      this.setState({win: true, status: 'win'}, () => {
        this.setLottoStatus()
      })
    }
  } 

  generateNumbers = () => {
    var lottoNumbers = [];
    for(var i = 0; i < 7; i++){
        var num = Math.floor(Math.random()*40);
        if(!lottoNumbers.includes(num)) {
            lottoNumbers.push(num);
        } else {
            i--
        }
    }

    this.setState(prevState  =>({
      weeks: prevState.weeks + 1,
    }), () => {
      if(this.state.weeks === 52) {
        this.setState(prevState  =>({
          years: prevState.years + 1,
          weeks: 0
        }))
      }
    })

    this.setLotto.current.setLotto()
    this.setState({lottoNumbers: lottoNumbers})
    this.checkWin()
  }

  setNumbers = (data) => {
    this.setState({numbers: data})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lotto App</Text>
        <Text style={styles.help}>Choose your Lotto numbers: {this.state.length}/7</Text>
        <Buttons setLength={this.setLength} setNumbers={this.setNumbers} lottoNumbers={this.state.lottoNumbers} ref={this.setLotto}/>
        <StartButton enabled={this.state.status} lottoStatus={this.setLottoStatus}/>
        <Result result={this.state.result} years={this.state.years}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 24,
    fontSize: 32,     
    fontWeight: 'bold',  
  },
  help: {
    marginTop: 12
  }
});
