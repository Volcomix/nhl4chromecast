import React, { Component } from 'react'
import { View, TextInput, Button, AsyncStorage, StyleSheet } from 'react-native'

class Login extends Component {
  static navigationOptions = {
    title: 'Authentification',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.textField]}>
          <TextInput
            style={styles.input}
            placeholder='Identifiant'
            keyboardType='email-address'
            autoCapitalize='none'
            autoFocus={true}
            returnKeyType='next'
          />
        </View>
        <View style={[styles.row, styles.textField]}>
          <TextInput
            style={styles.input}
            placeholder='Mot de passe'
            secureTextEntry={true}
            returnKeyType='go'
          />
        </View>
        <View style={styles.row}>
          <Button
            title='Se connecter'
            onPress={this.login}
          />
        </View>
      </View>
    )
  }

  login = async () => {
    try {
      await AsyncStorage.setItem('token', '666')
    } catch (error) {
      console.error(error)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textField: {
    marginLeft: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c7c7cc',
  },
  input: {
    height: 40,
    marginLeft: 16,
  },
  row: {
    height: 60,
    justifyContent: 'flex-end',
  },
})

export default Login