
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";

import { Camera } from "expo-camera";

export default function App() {
  const camRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === null) {
    return <Text>Access dained!</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();

      setCapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, left: 20 }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 13, color: "#FFF" }}>
              Toggle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={{ fontSize: 20, marginBottom: 13, color: "#FFF" }}>
              Click
            </Text>
          </TouchableOpacity>

          {capturedPhoto && (
            <Modal animationType="slide" transparent={false} visible={open}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => setOpen(false)}
                >
                  <Text style={{ fontSize: 20, marginBottom: 13, color: "#FFF" }}>
                    close
                  </Text>
                </TouchableOpacity>

                <Image
                  style={{ width: "100%", height: 300, borderRadius: 20 }}
                  source={{ uri: capturedPhoto }}
                />
              </View>
            </Modal>
          )}
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 50,
    width: 50,
    position: "absolute",
    bottom: 10,
    left: "40%"
  }
});