import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TextInput,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import * as tokenAction from "../store/actions/token";
import axios from "axios";
import moodstyles from "../styles/moodstyles";
import SkinnyIcon from "react-native-snappy";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/styles";
import proStyles from "../styles/profileStyles";
import spotify from "../images/spotify.png";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const SongPicker = ({
  songName,
  setSongName,
  songArtist,
  setSongArtist,
  songImage,
  setSongImage,
  songLink,
  setSongLink,
  clearSongToggle,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [songPlaying, setSongPlaying] = useState("");
  const [play, setPlay] = useState("");

  useEffect(() => {
    setName("");
    setArtist("");
    setImage("");
    setLink("");
  }, [clearSongToggle]);

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

  const handleSearchSubmit = () => {
    setSearchQuery(searchBar);
    if (searchBar === "") {
      setSearchResults([]); // Clear search results when query is empty
    } else {
      axios(`https://api.spotify.com/v1/search?q=${searchBar}&type=track`, {
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
    setSongName(name);
    setSongArtist(artist);
    setSongImage(image);
    setSongLink(link);
    setModalVisible(false);
    setSelectedItem(null);
    setSearchBar("");
    setSongPlaying("");
  };

  const handleCancel = () => {
    if (!songName) {
      handleClear();
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  };

  const handleClear = () => {
    setName("");
    setArtist("");
    setImage("");
    setSongName("");
    setSongArtist("");
    setSongImage("");
    setSongLink("");
    setSelectedItem(null);
    setSongPlaying("");
    setSearchBar("");
  };

  const playPauseSong = async (uri) => {
    let action = "";
    if (!songPlaying) {
      action = "play";
      setPlay(true);
    } else if (uri == songPlaying && play) {
      action = "pause";
      setPlay(false);
    } else if (uri == songPlaying && play) {
      action = "play";
      setPlay(true);
    } else {
      action = "play";
      setPlay(true);
    }
    try {
      await axios(`https://api.spotify.com/v1/me/player/${action}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          uris: uri != songPlaying ? [uri] : null,
        },
      });
      setSongPlaying(uri);
    } catch (error) {
      alert("No devices active. Please open Spotify and play/pause a song.");
    }
  };

  const handleSongPicker = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (searchBar == "") setSearchQuery("");
  }, [searchBar]);

  const handleSelection = (path) => {
    setName(path.name);
    setArtist(path.artists[0].name);
    setImage(path.album.images[0].url);
    setLink(path.external_urls.spotify);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSongPicker}
        style={styles.buttonContainer}
      >
        {songName == "" ? (
          <View style={styles.buttonIcon3}>
            <SkinnyIcon
              name="plus"
              size={16}
              strokeWidth={1.5}
              color="#979C9E"
              padding={10}
            />
            <Text style={styles.buttonText}>Add a song</Text>
            <SkinnyIcon
              name="image"
              size={20}
              strokeWidth={1.5}
              color="transparent"
            />
          </View>
        ) : (
          <View style={styles.songContainer2}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Image source={{ uri: songImage }} style={moodstyles.songImage} />
              <View style={styles.songTextContainer}>
                <Text numberOfLines={2} style={styles.songName}>
                  {songName}
                </Text>
                <Text style={styles.songArtist}>{songArtist}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleClear} styles={styles.xIcon}>
              <SkinnyIcon
                name="x"
                size={16}
                strokeWidth={1.5}
                color="#979C9E"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropTransitionOutTiming={10}
        style={styles.modalContentContainer}
      >
        {authenticated ? (
          <View style={moodstyles.modalContainer}>
            <View style={moodstyles.modalContent2}>
              <View style={proStyles.search}>
                <View style={proStyles.searchIcon}>
                  <SkinnyIcon
                    name="magnifier"
                    size={16}
                    strokeWidth={1.5}
                    color="#979C9E"
                  />
                </View>
                <TextInput
                  placeholder="Search for songs...                                         "
                  placeholderTextColor="#979C9E"
                  value={searchBar}
                  onChangeText={setSearchBar}
                  onSubmitEditing={handleSearchSubmit}
                />
                <TouchableOpacity
                  style={proStyles.xIcon}
                  onPress={() => {
                    setSearchResults([]);
                    setSearchBar(""); // Clear the query
                  }}
                >
                  <SkinnyIcon
                    name="x"
                    size={20}
                    strokeWidth={1.5}
                    color="#979C9E"
                  />
                </TouchableOpacity>
              </View>
              {searchQuery == "" && (
                <Text style={styles.modalTitleSpotify}>Recently Played</Text>
              )}

              <View style={moodstyles.modalButtonContainer}>
                <FlatList
                  data={searchQuery !== "" ? searchResults : recentlyPlayed}
                  keyExtractor={(item) => item.played_at || item.id}
                  renderItem={({ item }) => {
                    const path = searchQuery ? item : item.track;
                    const isSelected = selectedItem === path;

                    return (
                      <View
                        style={[
                          moodstyles.songContainer,
                          isSelected && moodstyles.selectedSongContainer,
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedItem(path);
                            handleSelection(path);
                          }}
                          style={moodstyles.songContainer}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              playPauseSong(path.uri);
                            }}
                          >
                            <ImageBackground
                              source={{ uri: path.album.images[0].url }}
                              style={moodstyles.songImage}
                            >
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {play && songPlaying == path.uri ? (
                                  <Ionicons
                                    name="pause"
                                    size={22}
                                    strokeWidth={1.5}
                                    color="white"
                                  />
                                ) : (
                                  <Ionicons
                                    name="play"
                                    size={22}
                                    strokeWidth={1.5}
                                    color="white"
                                  />
                                )}
                              </View>
                            </ImageBackground>
                          </TouchableOpacity>

                          <View style={moodstyles.songDetails}>
                            <Text numberOfLines={1} style={moodstyles.songName}>
                              {path.name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={moodstyles.artistName}
                            >
                              {path.artists[0].name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={moodstyles.modalButtonContainer2}
                />

                <TouchableOpacity
                  onPress={handleDone}
                  style={moodstyles.doneButton}
                >
                  <Text style={moodstyles.doneButtonText}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancel}
                  style={moodstyles.cancelButton2}
                >
                  <Text style={moodstyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={moodstyles.modalContainer}>
            <View style={moodstyles.modalContent}>
              <Text style={styles.spotifyModalText}>
                Every main character has their own soundtrack.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  promptAsync();
                }}
                style={styles.spotifyButton}
              >
                <Image style={styles.spotifyButtonIcon} source={spotify} />
                <Text style={styles.spotifyButtonText}>
                  Connect with Spotify
                </Text>
              </TouchableOpacity>
              <View style={moodstyles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.cancelButtonSpotify}
                >
                  <Text style={styles.cancelButtonTextSpotify}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};
export default SongPicker;
