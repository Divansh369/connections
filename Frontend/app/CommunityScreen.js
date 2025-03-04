import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

export default function CommunityScreen() {
  const [communities, setCommunities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const { data, error } = await supabase.from('communities').select('*');
    if (error) console.error(error);
    else setCommunities(data);
  };

  const createCommunity = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      alert(userError.message);
      return;
    }
    if (user) {
      const { error: insertError } = await supabase
        .from('communities')
        .insert([{ name, description, created_by: user.id }]);
      if (insertError) {
        console.error(insertError.message);
      } else {
        fetchCommunities();
        setName('');
        setDescription('');
      }
    } else {
      alert("User not authenticated");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Community</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Community Name" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
      />
      <TouchableOpacity style={styles.button} onPress={createCommunity}>
        <Text style={styles.buttonText}>Create Community</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Communities</Text>
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.communityCard}>
            <Text style={styles.communityName}>{item.name}</Text>
            <Text style={styles.communityDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  communityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  communityDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
