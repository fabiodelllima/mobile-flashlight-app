import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Shake from 'expo-shake'
import { Camera, CameraType, FlashMode } from 'expo-camera'

export default function App() {
  const [toggle, setToggle] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)

  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  useEffect(() => {
    Shake.addListener(() => {
      setToggle((oldToggle) => !oldToggle)
    })
    return () => {
      Shake.removeSubscription(() => {})
    }
  }, [])

  return (
    <>
      {hasPermission && toggle && (
        <Camera
          style={{ height: 1 }}
          type={CameraType.back}
          flashMode={FlashMode.torch}
        />
      )}
      <View
        style={
          toggle ? style.containerFlashlightOn : style.containerFlashlightOff
        }
      >
        <TouchableOpacity onPress={handleChangeToggle}>
          <Image
            style={toggle ? style.flashlightOn : style.flashlightOff}
            source={
              toggle
                ? require('./assets/icons/light-on.png')
                : require('./assets/icons/light-off.png')
            }
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  containerFlashlightOff: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFlashlightOn: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashlightOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  flashlightOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
})
