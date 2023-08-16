import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import * as tokenAction from "../../store/actions/token";
import axios from "axios";
import * as songAction from "../../store/actions/topSongs.js";
import moodstyles from "../../styles/moodstyles";
import { PlayURI } from "expo-av/build/AV";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const SpotifyScreen = ({ setModalVisible }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "0c35303b5a3645068585e6bcd1d3339e",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://10.1.29.201:8081",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      axios("https://api.spotify.com/v1/me/player/recently-played", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
        .then((response) => {
          setRecentlyPlayed(response.data.items);
        })
        .catch((error) => {
          console.log("error", error.message);
        });

      setTimeout(() => setAuthenticated(true));

      dispatch(tokenAction.addToken(token));
    }
  }, [response]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]); // Clear search results when query is empty
    } else {
      axios(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          setSearchResults(response.data.tracks.items);
        })
        .catch((error) => {
          console.log("error", error.message);
        });
    }
  };

  const handleDone = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const playSong = async (uri) => {
    console.log(uri);
    try {
      await axios("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          uris: [uri],
        },
      });
    } catch (error) {
      alert("No devices active. Please open Spotify and play/pause a song.");
    }
  };

  if (authenticated) {
    return (
      <View style={moodstyles.modalContainer}>
        <View style={moodstyles.modalContent}>
          <TextInput
            style={moodstyles.searchBar}
            placeholder="Search for songs..."
            value={searchQuery}
            onChangeText={handleSearchQueryChange}
          />
          {searchQuery == "" && (
            <Text style={moodstyles.modalTitle}>Recently Played</Text>
          )}

          <View style={moodstyles.modalButtonContainer}>
            <FlatList
              data={searchQuery != "" ? searchResults : recentlyPlayed}
              keyExtractor={(item) => item.played_at}
              renderItem={({ item }) => {
                const path = searchQuery ? item : item.track;
                return (
                  <View style={moodstyles.songContainer}>
                    <TouchableOpacity onPress={() => console.log("pressed")}>
                      <TouchableOpacity onPress={() => playSong(path.uri)}>
                        <Image
                          source={{ uri: path.album.images[0].url }}
                          style={moodstyles.songImage}
                        />
                      </TouchableOpacity>
                      <View style={moodstyles.songDetails}>
                        <Text style={moodstyles.songName}>{path.name}</Text>
                        <Text style={moodstyles.artistName}>
                          {path.artists[0].name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 350 }}
            />

            <TouchableOpacity
              onPress={handleDone}
              style={moodstyles.doneButton}
            >
              <Text style={moodstyles.doneButtonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              style={moodstyles.cancelButton}
            >
              <Text style={moodstyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={moodstyles.modalContainer}>
      <View style={moodstyles.modalContent}>
        <Text>Every main character has their own soundtrack.</Text>
        <TouchableOpacity
          onPress={() => {
            promptAsync();
          }}
        >
          <Text>Connect with Spotify</Text>
        </TouchableOpacity>
        <View style={moodstyles.modalButtonContainer}>
          <TouchableOpacity onPress={handleDone} style={moodstyles.doneButton}>
            <Text style={moodstyles.doneButtonText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            style={moodstyles.cancelButton}
          >
            <Text style={moodstyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SpotifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  button: {
    width: 200,
    marginTop: 50,
  },
});
