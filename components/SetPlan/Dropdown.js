import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Octicons'
import store from '../../store/store'
import colors from '../../constants/colors'

const Category = () => {
  const items = [
    { id: 0, name: "No Category" },
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Wishlist" },
    { id: 4, name: "Birthday" },
  ]

  const { category, setCategory } = useContext(store)
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.dropdownButton}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>{category}</Text>
        <Icon
          name={open ? 'triangle-up' : 'triangle-down'}
          color={colors.three}
          size={18}
        />
      </TouchableOpacity>

      {/* Dropdown Popup */}
      {open && (
        <View style={styles.dropdown}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setCategory(item.name)
                setOpen(false)
              }}
              style={[
                styles.dropdownItem,
                category === item.name && styles.activeItem
              ]}
            >
              <Text style={[
                styles.dropdownText,
                category === item.name && styles.activeText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    width: wp(40),
    position: "relative",
    padding: wp(1),
    marginBottom: wp(1)
  },
  dropdownButton: {
    backgroundColor: colors.four,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  selectedText: {
    color: colors.three,
    fontSize: hp(1.8),
    fontWeight: "500"
  },
  dropdown: {
    backgroundColor: colors.three,
    position: "absolute",
    top: hp(5.2),
    width: "100%",
    borderRadius: 10,
    paddingVertical: hp(1),
    zIndex: 50,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Elevation for Android
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  dropdownText: {
    color: colors.two,
    fontWeight: "bold",
    fontSize: hp(1.9),
  },
  activeItem: {
    borderRadius: 6,
  },
  activeText: {
    color: colors.one,
    fontWeight:"bold"
  },
})
