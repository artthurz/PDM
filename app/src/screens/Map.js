import React, { useState, useEffect } from "react";
import MapView, { Marker, Animated } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";

export default function Map() {

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0023,
    longitudeDelta: 0.0024,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [compassData, setCompassData] = useState();

  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await Location.watchHeadingAsync((compassData) => {
        setCompassData(compassData);
      });

      setSubscription(
        Accelerometer.addListener((accelerometerData) => {
          setAccelerometerData(accelerometerData);
        })
      );

      const { coords } = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0023,
        longitudeDelta: 0.0024,
      });
    })();
  }, []);


  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const { x, y, z } = accelerometerData;

  return (
    <View style={styles.container}>
      <Animated
        showsUserLocation
        loadingEnabled
        style={styles.map}
        initialRegion={region}
      >
        <Marker coordinate={region} anchor={{ x: 0, y: 0 }} title="Posição Atual"/>
      </Animated>
      <View style={styles.container}>
        <Text>Acelerometro: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={_slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textTitle}>Bussola</Text>
          <Text style={styles.text}>{compassData?.magHeading}</Text>
        </View>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "50%",
  },
  text: {
    textAlign: "center",
  },
  textTitle: {
    marginTop: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
