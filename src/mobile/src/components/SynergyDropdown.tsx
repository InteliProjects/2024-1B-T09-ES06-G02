import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface DropdownProps {
    options: Array<string | number>;
    placeholder: string;
  }

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  
    return (
      <View style={{ position: 'relative', width: 160 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#3A8A88',
          opacity: 0.6,
          borderRadius: 25,
          padding: 12,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={{ color: 'white', flex: 1 }}>
          {selectedOption ? selectedOption : placeholder}
        </Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} type="font-awesome" color="white" />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            zIndex: 50,
            width: '100%',
            marginTop: 8,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{ padding: 16, borderBottomWidth: index === options.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}
              onPress={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              <Text style={{ color: '#555555' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
  
  export default Dropdown;