import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput, Image, Alert } from 'react-native';
import { bicycleDataSee,bicycleRequest } from './nesne';
export default function App() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isContinuing, setIsContinuing] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (nickname && password) {
      // Kullanıcı kaydı.
      // Yerel depo kullanımı.
      const newUser = { nickname, password };
      setUsers([...users, newUser]);
      setLoggedInUser(newUser);
      clearForm();
    } else {
      setError('Nickname ve şifre gerekli.');
    }
  };

  const handleSignIn = () => {
    if (nickname && password) {
      // Kullanıcı girişi.
      // Kullanıcıları kontrol etme.
      const user = users.find((u) => u.nickname === nickname && u.password === password);
      if (user) {
        setLoggedInUser(user);
        clearForm();
        setIsContinuing(true);
      } else {
        setError('Nickname veya şifre yanlış.');
      }
    } else {
      setError('Nickname ve şifre gerekli.');
    }
  };

  const clearForm = () => {
    setNickname('');
    setPassword('');
  };

  const handleSignOut = () => {
    setLoggedInUser(null);
    setIsContinuing(false);
  };

  return (
    <SafeAreaView style={styles.backGround}>
      {isContinuing ? (
        <View>
          <View style={{ width: 400, height: 50, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 24 }}>BİSİKLET KİRALAMA UYGULAMASI</Text>
          </View>

          <Image
            source={{
              uri: "https://www.manbis.bel.tr/photos/hemen-kirala.jpg",
              width: 400,
              height: 120
            }}
          />

          <View style={{ width: 400, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 21, alignContent: 'center', alignItems: 'center' }}>Giriş yaptınız, kiralama yapabilirsiniz!</Text>
          </View>

          <Button title="Tüm bisikletleri gör!" onPress={() => bicycleDataSee()} />
          <Button title="Kiralama yap!" onPress={() => bicycleRequest()} />
          <Button title="Çıkış Yap" onPress={handleSignOut} />
        </View>
      ) : (
        <View>
          {loggedInUser ? (
            <View>
              <Text style={{ color: 'black', fontSize: 21 }}>{`Hoş geldiniz, ${loggedInUser.nickname}!`}</Text>
              <Button title="Çıkış Yap" onPress={() => setLoggedInUser(null)} />
              <Button title="Devam Et" onPress={() => setIsContinuing(true)} />
            </View>
          ) : (
            <View>
              {error !== '' && <Text style={styles.errorText}>{error}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Nickname"
                onChangeText={(text) => setNickname(text)}
                value={nickname}
              />
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <Button title="Giriş Yap" onPress={handleSignIn} />
              <Button title="Kaydol" onPress={handleSignUp} />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
