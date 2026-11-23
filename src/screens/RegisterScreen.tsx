import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';
import {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
type FieldName = 'name' | 'email' | 'password' | 'confirm';

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [focusedField, setFocusedField] = useState<FieldName | null>(null);

  // Klavyede "İleri" tuşuyla inputlar arası geçiş için referanslar
  const emailRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const passwordRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const confirmRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const handleRegister = () => {
    const nameCheck = validateDisplayName(name);
    const emailCheck = validateEmail(email);
    const passCheck = validatePassword(password);
    const confirmCheck = validateConfirmPassword(password, confirmPassword);

    setNameError(nameCheck.error);
    setEmailError(emailCheck.error);
    setPasswordError(passCheck.error);
    setConfirmError(confirmCheck.error);

    if (!nameCheck.isValid || !emailCheck.isValid || !passCheck.isValid || !confirmCheck.isValid) {
      return;
    }

    // H12'de burası Firebase createUserWithEmailAndPassword ile değiştirilecek
    Alert.alert('Başarılı', 'Kayıt oluşturuldu, giriş yapabilirsiniz.');
    navigation.navigate('Login');
  };

  const inputStyle = (field: FieldName, hasError: boolean) => [
    styles.input,
    focusedField === field && styles.inputFocused,
    hasError && styles.inputError,
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Film ve dizilerini takip etmeye başla</Text>

        <View>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={inputStyle('name', nameError !== '')}
            placeholder="Adınız ve soyadınız"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="words"
            returnKeyType="next"
            blurOnSubmit={false}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError('');
            }}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.label}>E-posta</Text>
          <TextInput
            ref={emailRef}
            style={inputStyle('email', emailError !== '')}
            placeholder="ornek@mail.com"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            blurOnSubmit={false}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.label}>Şifre</Text>
          <TextInput
            ref={passwordRef}
            style={inputStyle('password', passwordError !== '')}
            placeholder="En az 6 karakter"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => confirmRef.current?.focus()}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Text style={styles.label}>Şifre Tekrar</Text>
          <TextInput
            ref={confirmRef}
            style={inputStyle('confirm', confirmError !== '')}
            placeholder="Şifrenizi tekrar girin"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmError) setConfirmError('');
            }}
            onFocus={() => setFocusedField('confirm')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={handleRegister}
          />
          {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>
              Zaten hesabın var mı? <Text style={styles.linkHighlight}>Giriş Yap</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: theme.fontSize.md,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  inputError: {
    borderColor: theme.colors.error,
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
    marginTop: theme.spacing.lg * 1.5,
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
  linkHighlight: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});