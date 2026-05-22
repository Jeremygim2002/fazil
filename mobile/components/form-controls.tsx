import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type FormFieldProps = {
  label: string;
  placeholder: string;
  icon?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

type SelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onPress: () => void;
};

type ChoiceModalProps = {
  title: string;
  visible: boolean;
  options: string[];
  selectedValue: string;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export function FormField({ label, placeholder, icon, value, onChangeText }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <ThemedText themeColor="textSecondary" style={styles.fieldLabel}>
        {label}
      </ThemedText>
      <View style={styles.fieldInput}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          style={styles.inputText}
        />
        {icon ? <Ionicons name={icon as any} size={18} color="#94a3b8" /> : null}
      </View>
    </View>
  );
}

export function SelectField({ label, value, placeholder, onPress }: SelectFieldProps) {
  return (
    <View style={styles.field}>
      <ThemedText themeColor="textSecondary" style={styles.fieldLabel}>
        {label}
      </ThemedText>
      <Pressable style={styles.fieldInput} onPress={onPress}>
        <ThemedText style={[styles.selectValue, !value ? styles.selectPlaceholder : null]}>
          {value || placeholder}
        </ThemedText>
        <Ionicons name="chevron-down" size={18} color="#94a3b8" />
      </Pressable>
    </View>
  );
}

export function ChoiceModal({ title, visible, options, selectedValue, onClose, onSelect }: ChoiceModalProps) {
  const mappedOptions = useMemo(() => options, [options]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalCard}>
          <ThemedText type="smallBold" style={styles.modalTitle}>
            {title}
          </ThemedText>
          <View style={styles.modalList}>
            {mappedOptions.map((option) => (
              <Pressable
                key={option}
                style={[styles.modalOption, selectedValue === option ? styles.modalOptionSelected : null]}
                onPress={() => onSelect(option)}>
                <ThemedText style={[styles.modalOptionText, selectedValue === option ? styles.modalOptionTextSelected : null]}>
                  {option}
                </ThemedText>
                {selectedValue === option ? <Ionicons name="checkmark-circle" size={18} color="#0b3b78" /> : null}
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },
  selectValue: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },
  selectPlaceholder: {
    color: '#94a3b8',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  modalCard: {
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    color: '#111827',
  },
  modalList: {
    gap: 10,
  },
  modalOption: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalOptionSelected: {
    borderColor: '#0b3b78',
    backgroundColor: '#eff6ff',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  modalOptionTextSelected: {
    color: '#0b3b78',
  },
});