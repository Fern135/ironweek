/**
 * @file useKeyboardLift.ts
 * @description Keeps a Paper dialog with a text box above the keyboard. Paper centers dialogs
 * on the whole screen, so the keyboard would otherwise cover the box.
 */
import { useEffect, useState } from 'react';
import { Keyboard, Platform, type ViewStyle } from 'react-native';

/**
 * Style for a dialog that has a text box.
 * @returns Bottom margin while the keyboard is open, otherwise undefined
 */
export function useKeyboardLift(): ViewStyle | undefined {
  const [keyboard, setKeyboard] = useState(0);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => setKeyboard(e.endCoordinates.height));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboard(0));
    return () => { show.remove(); hide.remove(); };
  }, []);
  // 44 is Paper's own vertical dialog margin on Android, which this replaces.
  return keyboard ? { marginBottom: keyboard + (Platform.OS === 'android' ? 44 : 0) } : undefined;
}
