import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Typography } from "../styles";
import { Context } from "../context/SequenceContext";

const SequenceEditScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;
   const { state, getSeq, updateSeq, deleteSeq, updateTask, deleteTask } = useContext(Context);
   const [localState, setLocalState] = useState(state);

   useEffect(() => {
      getSeq(currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         getSeq(currentSeq);
      });

      return unsubscribe;
   }, [navigation]);

   function handleUpdate(item, field, input) {
      switch(field) {
         case 'name':
            updateTask(currentSeq, item.item.TaskName, 'TaskName', input);
            break;
         case 'duration':
            updateTask(currentSeq, item.item.TaskName, 'TaskDuration', input);
            break;
         default:
            break;
      }
   }

   return (
     <View style={styles.container}>
         <TextInput
            placeholder={currentSeq}
            style={styles.title}
            onChangeText={input => setLocalState(input)}
            onEndEditing={() => updateSeq(currentSeq, localState)}
         />
        <FlatList
           data={state}
           keyExtractor={(item) => item.TaskName}
           style={styles.list}
           renderItem={item => {
              return(
                 <View style={styles.listRow}>
                    <Text style={[styles.listIndex, styles.listText]}>{item.item.TaskIndex}</Text>
                    <TextInput
                       style={[styles.listName, styles.listText]}
                       placeholder={item.item.TaskName}
                       onChangeText={input => setLocalState(input)}
                       onEndEditing={() => handleUpdate(item, 'name', localState)}
                    />
                    <TextInput
                       style={[styles.listDuration, styles.listText]}
                       placeholder={item.item.TaskDuration.toString()}
                       onChangeText={input => handleUpdate(item, 'duration', input)}
                    />
                    <TouchableOpacity
                       style={styles.listRowButton}
                       onPress={() => deleteTask(currentSeq, item.item.TaskName)}
                    >
                       <Text style={styles.delete}>DELETE</Text>
                    </TouchableOpacity>
                 </View>
              )
           }}
        />
        <TouchableOpacity
           onPress={() => {
              deleteSeq(currentSeq);
              navigation.navigate('Sequences');
           }}
           style={styles.buttonBottom}
        >
           <Text style={styles.delete}>DELETE SEQUENCE</Text>
        </TouchableOpacity>
     </View>
   );
};

const styles = EStyleSheet.create({
   buttonBottom: {
      alignSelf: 'center',
   },
   container: {
     flexDirection: 'column',
      height: '100%',
      padding: 20,
   },
   delete: {
     color: 'red',
   },
   list: {
   },
   listRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   listRowButton: {
      flex: 1,
   },
   listText: {
      fontSize: 15,
      ...Colors.blue,
   },
   listName: {
      flex: 2,
   },
   listDuration: {
      flex: 1,
   },
   listIndex: {
      flex: 1,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      textAlign: 'center'
   }
});

export default SequenceEditScreen;
