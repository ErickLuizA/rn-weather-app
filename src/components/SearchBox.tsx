import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useTheme from '../hooks/useTheme'

interface ISearchBoxProps {
  handleSubmit: (input: string) => Promise<void>
}

export default function SearchBox({ handleSubmit }: ISearchBoxProps) {
  const [input, setInput] = useState('')

  const { theme } = useTheme()

  return (
    <View style={[styles.row, { backgroundColor: theme.surface }]}>
      <AntDesign name="search1" size={25} color={theme.onBackground} />
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => handleSubmit(input)}
        placeholder="Search for a city"
        placeholderTextColor={theme.onBackground}
        style={[styles.searchText, { color: theme.onBackground }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    borderRadius: 5,
    paddingVertical: 16,
  },

  searchText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_300Light',
    marginLeft: 8,
  },
})
