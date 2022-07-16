import { StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      paddingTop : 20,
    },
    secondContainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
      },
      headerText:{
        color: '#223e4b', 
        fontSize: 20, 
        marginBottom: 16
      },
      backIcon:{
        position: 'absolute',
        top: 50,
        left: 20,
      },
      inputContainer:{
        paddingHorizontal: 32, 
        marginBottom: 16, 
        width: '100%'
      },
})