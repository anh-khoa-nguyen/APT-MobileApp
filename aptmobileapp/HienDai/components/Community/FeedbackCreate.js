import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { styles } from './stylesC_f';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

export default function FeedbackCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.desc}>
        Submit your feedback, suggestions, or complaints to the management board.
      </Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        mode="outlined"
        style={styles.input}
        placeholder="Enter a title for your feedback"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      {/* <TextInput
        mode="outlined"
        style={[styles.input, { minHeight: 120 }]}
        placeholder="Describe your feedback, issue, or suggestion in detail..."
        value={content}
        onChangeText={setContent}
        // multiline
        /> */}
      {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
      <Text style={styles.label}>Attach Image (Optional)</Text>
      <Button
        mode="outlined"
        style={styles.imageBtn}
        labelStyle={styles.imageLabel}
        onPress={() => {}}
      >
        Select Image
      </Button>
      <Button
        mode="contained"
        style={styles.submitBtn}
        labelStyle={styles.submitLabel}
        onPress={() => {}}
      >
        Submit Feedback
      </Button>
    </ScrollView>
  );
}