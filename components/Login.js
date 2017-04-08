import React, { Component } from 'react'
import { View, ActivityIndicator, TextInput, Button, StyleSheet } from 'react-native'

class Login extends Component {
  render() {
    const { isInProgress, onLoginPressed } = this.props
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
          {isInProgress ?
            <ActivityIndicator style={styles.progress} /> :
            <Button
              title='Se connecter'
              onPress={onLoginPressed}
            />
          }
        </View>
      </View>
    )
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
  progress: {
    height: 40,
  },
})

export default Login