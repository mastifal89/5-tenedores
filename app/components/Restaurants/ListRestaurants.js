import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native"

export default function ListRestaurants(props) {
    const { restaurants, handleLoadMore, loading } = props;
    const navigation = useNavigation();
    
    return (
        <View>
            {size(restaurants) > 0 ? (
                <FlatList 
                    data={restaurants}
                    renderItem={(restaurant) => <Restaurant 
                                                    restaurant={restaurant} 
                                                    navigation={navigation} 
                                                />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<Footerlist loading={loading} />}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" color="#00a680" />
                    <Text>Cargando Restaurantes</Text>
                </View>
            )}
        </View>
    )
}

function Restaurant(props) {
    const { restaurant, navigation } = props;
    const { id, images, name, description, address } = restaurant.item;
    const imageRestaurant = images[0];

    const goRestaurant = () => {
        navigation.navigate("restaurant", {
            id,
            name
        })
    }

    return (
        <TouchableOpacity onPress={goRestaurant}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image 
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={
                            imageRestaurant
                            ? { uri: imageRestaurant }
                            : require("../../../assets/img/no-image.png")
                        }
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddess}>{address}</Text>
                    <Text style={styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function Footerlist(props) {
    const { loading } = props;

    if(loading) {
        return (
            <View style={styles.loaderRestaurants}>
                <ActivityIndicator size="large" color="#00a680"/>
            </View>
        )
    } else {
        return (
            <View style={styles.notFoundrestaurants}>
                <Text>No quedan restaurantes</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewRestaurant: {
        flexDirection: "row",
        margin: 10
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 80
    },
    restaurantName: {
        fontWeight: "bold"
    },
    restaurantAddess: {
        paddingTop: 2,
        color: "grey"
    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },
    notFoundrestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }
})
