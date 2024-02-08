import { TextInput, TextInputProps } from "react-native";
import colors from 'tailwindcss/colors';

type InputProps = TextInputProps;

export function Input( {...rest}: InputProps) {
  return (
  <TextInput 
        className='h-32 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white'
        textAlignVertical="top"
        placeholderTextColor={colors.slate[400]}
        multiline
        {...rest}>

  </TextInput>
  )
}
