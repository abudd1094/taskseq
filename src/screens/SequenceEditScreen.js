import React, {useEffect, useContext} from 'react';
import { FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from "../styles";
import { Context } from "../context/SequenceContext";

const SequenceEditScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;
   const { state, getSeq, deleteSeq, updateTask, deleteTask } = useContext(Context);

   useEffect(() => {
      getSeq(currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         getSeq(currentSeq);
      });

      return unsubscribe;
   }, [navigation]);

   return (
     <View style={styles.container}>
         <Text style={styles.title}>{currentSeq}</Text>
        <FlatList
           data={state}
           keyExtractor={(item) => item.TaskName}
           style={styles.list}
           renderItem={item => {
              return(
                 <View style={styles.listRow}>
                    <TextInput
                       style={[styles.listName, styles.listText]}
                       value={item.item.TaskName}
                       onChangeText={input => updateTask(currentSeq, item.item.TaskName, 'TaskName', input)}
                    />
                    <TextInput
                       style={[styles.listDuration, styles.listText]}
                       value={item.item.TaskDuration.toString()}
                       onChangeText={input => handleTaskUpdate(item, 'duration', input)}
                    />
                    <Text style={[styles.listIndex, styles.listText]}>{item.item.TaskIndex}</Text>
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
