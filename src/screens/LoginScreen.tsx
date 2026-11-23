import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';
import { validateEmail, validatePassword } from '../utils/validation';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const passwordInputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const handleLogin = () => {
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);

    setEmailError(emailCheck.error);
    setPasswordError(passwordCheck.error);

    if (!emailCheck.isValid || !passwordCheck.isValid) return;

    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.logo}>CineLog</Text>
      <Text style={styles.subtitle}>Film ve Dizi Takip Asistanı</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta adresiniz"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        placeholder="Şifreniz"
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleLogin}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.fontSize.md,
  },
  linkText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    fontSize: theme.fontSize.sm,
  },
});