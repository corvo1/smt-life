#!/usr/bin/env bash
# Boots an Android emulator (if none is running) and launches the app as a
# development build via `expo run:android`.
#
# Expo Go can't run this app: expo-notifications' Android push handling was
# removed from Expo Go in SDK 53+, so it crashes on load there. A dev client
# build includes the real native module and works correctly.
set -euo pipefail

cd "$(dirname "$0")/.."

SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Library/Android/sdk}}"
ADB="$SDK/platform-tools/adb"
EMULATOR="$SDK/emulator/emulator"

if [ ! -x "$ADB" ] || [ ! -x "$EMULATOR" ]; then
  echo "Android SDK not found at $SDK (set ANDROID_HOME to override)." >&2
  exit 1
fi

if ! "$ADB" devices | grep -q "device$"; then
  AVD="$("$EMULATOR" -list-avds | head -n1)"
  if [ -z "$AVD" ]; then
    echo "No Android emulator (AVD) configured. Create one in Android Studio's Device Manager first." >&2
    exit 1
  fi

  echo "Booting emulator: $AVD"
  nohup "$EMULATOR" -avd "$AVD" -no-snapshot -no-boot-anim >/tmp/smt-life-emulator.log 2>&1 &

  "$ADB" wait-for-device
  until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
    sleep 3
  done
  echo "Emulator booted."
else
  echo "Using already-running device/emulator."
fi

npx expo run:android
