import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../supabaseClient';

export default function MainScreen() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [replyLoading, setReplyLoading] = useState({});

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time post changes
    const postSubscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts((prevPosts) => [payload.new, ...prevPosts]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postSubscription);
    };
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setPosts(data);
    setLoading(false);
  };

  const fetchReplies = async (postId) => {
    setReplyLoading((prev) => ({ ...prev, [postId]: true }));
    const { data, error } = await supabase.from('replies').select('*').eq('post_id', postId).order('created_at', { ascending: false });
    if (error) console.error(error);
    else setReplies((prev) => ({ ...prev, [postId]: data }));
    setReplyLoading((prev) => ({ ...prev, [postId]: false }));
  };

  useEffect(() => {
    const replySubscription = supabase
      .channel('replies')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'replies' }, (payload) => {
        setReplies((prev) => {
          const postId = payload.new.post_id;
          return { ...prev, [postId]: [payload.new, ...(prev[postId] || [])] };
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(replySubscription);
    };
  }, []);

  const createPost = async () => {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) {
      console.error("Error fetching user:", error.message);
      alert("Failed to fetch user. Please log in.");
      return;
    }
  
    if (!data?.user) {
      alert("No user is logged in.");
      return;
    }
  
    const { error: insertError } = await supabase
      .from('posts')
      .insert([{ title, content, user_id: data.user.id }]);
  
    if (insertError) {
      console.error("Error inserting post:", insertError.message);
    } else {
      setTitle('');
      setContent('');
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Content" value={content} onChangeText={setContent} multiline />
      <Button title="Create Post" onPress={createPost} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>👍 Like</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => {
                    setSelectedPost(item.id);
                    fetchReplies(item.id);
                  }}>
                  <Text style={styles.buttonText}>💬 Comment</Text>
                </TouchableOpacity>
              </View>
              {selectedPost === item.id && (
                <View style={styles.repliesContainer}>
                  {replyLoading[item.id] ? (
                    <ActivityIndicator size="small" color="#007bff" />
                  ) : (
                    (replies[item.id] || []).map((reply) => (
                      <Text key={reply.id} style={styles.replyText}>🔹 {reply.content}</Text>
                    ))
                  )}
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  repliesContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  replyText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  loader: {
    marginTop: 20,
  },
});
