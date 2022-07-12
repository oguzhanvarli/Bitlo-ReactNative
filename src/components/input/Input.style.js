import { StyleSheet} from 'react-native'


export default StyleSheet.create({
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8
    },
    iconContainer:{
        padding : 8,
    },
    inputSecondContainer:{
        flex:1
    },
    errorMessage:{
        color: 'red'
    }
})