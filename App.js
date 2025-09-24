import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, FlatList } from 'react-native';

export default function App() {
  const [bidNumber, setBidNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [preBidMeeting, setPreBidMeeting] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [tenders, setTenders] = useState([]);

  const fetchTenders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tenders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert("Error", "Could not fetch tenders from the server.");
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const handleAddTender = async () => {
    const tender = {
      bidNumber,
      startDate,
      endDate,
      organizationName,
      itemCategory,
      preBidMeeting,
      submissionDate,
    };

    try {
      const response = await fetch('http://localhost:3000/api/tenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tender),
      });

      if (response.ok) {
        Alert.alert("Success", "Tender added successfully!");
        
        // Reset the form fields after successful submission
        setBidNumber('');
        setStartDate('');
        setEndDate('');
        setOrganizationName('');
        setItemCategory('');
        setPreBidMeeting('');
        setSubmissionDate('');

        fetchTenders(); // Refresh the list from the server
      } else {
        Alert.alert("Error", "Failed to add tender.");
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Petropath Tender Tracker</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bid Number:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setBidNumber} 
            value={bidNumber} 
            placeholder="Enter Bid Number"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bid Start Date & Time:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setStartDate} 
            value={startDate} 
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bid End Date & Time:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setEndDate} 
            value={endDate} 
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Organization Name:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setOrganizationName} 
            value={organizationName} 
            placeholder="Enter Organization Name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Category:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setItemCategory} 
            value={itemCategory} 
            placeholder="Enter Item Category"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pre-Bid Meeting Date & Time:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setPreBidMeeting} 
            value={preBidMeeting} 
            placeholder="YYYY-MM-DDTHH:MM"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Submission Date:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setSubmissionDate} 
            value={submissionDate} 
            placeholder="YYYY-MM-DD"
          />
        </View>

        <Button title="Add Tender" onPress={handleAddTender} />

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Saved Tenders</Text>
          <FlatList
            data={tenders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tenderItem}>
                <Text style={styles.tenderText}>Bid: {item.bidNumber}</Text>
                <Text style={styles.tenderText}>Org: {item.organizationName}</Text>
                <Text style={styles.tenderText}>End Date: {item.endDate}</Text>
              </View>
            )}
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  listContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tenderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  tenderText: {
    fontSize: 14,
  },
});