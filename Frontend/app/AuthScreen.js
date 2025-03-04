import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { supabase } from '../supabaseClient';

export default function AuthScreen({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isRegistering]);

  const signUp = async () => {
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ name, username, email, password_hash: password, gender: true, current_location: '(0,0)' }]);

    if (insertError) {
      alert(insertError.message);
    } else {
      alert('User registered successfully');
      setIsRegistering(false);
    }
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }

    // Fetch correct user ID
    const { data: userData, error: userFetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userFetchError || !userData) {
      alert('Failed to fetch user ID.');
      return;
    }

    console.log('User ID:', userData.id);
    navigation.navigate('Main', { userId: userData.id });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{isRegistering ? 'Sign Up' : 'Sign In'}</Text>

        {isRegistering && (
          <>
            <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
          </>
        )}

        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={isRegistering ? signUp : signIn}>
          <Text style={styles.buttonText}>{isRegistering ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? 'Already have an account? Sign in' : 'No account? Register here'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 12,
    fontSize: 15,
  },
});
