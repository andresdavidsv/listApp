/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';

// Resources
import {colors} from './src/resources/color';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [itemList, setItemList] = useState([]);
  const [load, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const handleChange = text => setInputValue(text);
  const handleAdd = () => {
    setLoad(true);
    if (inputValue) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(),
          value: inputValue,
        },
      ]);
      setInputValue('');
    }
    setLoad(false);
  };
  const handleDeleteItem = id => {
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(true);
  };
  const handleConfirmDeleteItem = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter(item => item.id !== id));
    setModalVisible(false);
    setItemSelected({});
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setItemSelected({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange}
          value={inputValue}
          placeholder="Type a Item"
          placeholderTextColor={styles.textInput.color}
        />
        <Pressable onPress={handleAdd} style={styles.btnAdd}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      {!load ? (
        <FlatList
          data={itemList}
          keyExtractor={item => item.id}
          renderItem={item => (
            <View style={styles.item}>
              <Text>{item.item.value}</Text>
              <Pressable
                onPress={() => handleDeleteItem(item.item.id)}
                style={styles.btnDelete}>
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator
          style={styles.loader}
          color={styles.loader.color}
          size="large"
        />
      )}
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalCloseBtn}>
              <Pressable
                onPress={handleCloseModal}
                style={styles.btnCloseModal}>
                <Text style={styles.btnText}>x</Text>
              </Pressable>
            </View>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete?
            </Text>
            <Text style={styles.modalTitle}>{itemSelected.value}</Text>
            <View>
              <Pressable
                onPress={handleConfirmDeleteItem}
                style={styles.btnConfirmDelete}>
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  btnAdd: {
    backgroundColor: 'blue',
    padding: 8,
    margin: 16,
    borderRadius: 50,
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 50,
  },
  btnConfirmDelete: {
    backgroundColor: 'red',
    padding: 8,
  },
  modalCloseBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 1,
  },
  btnCloseModal: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
  loader: {
    marginTop: 60,
    marginBottom: 60,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.charade,
  },
  modalContent: {
    padding: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessage: {
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default App;
