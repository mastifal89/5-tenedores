import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = async () => {
        let isSetErrors = true;
        let errorTemp = {};
        setErrors({});

        if(!formData.password ||
           !formData.newPassword || 
           !formData.repeatPassword
        ) {
            errorTemp = {
                password: !formData.password ? "La contraseña no puede estar vacía" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacía" : "",
                repeatPassword: !formData.repeatPassword ? "La contraseña no puede estar vacía" : ""
            };
        } else if(formData.newPassword !== formData.repeatPassword) {
            errorTemp = {
                newPassword: "Las contraseñas no son iguales",
                repeatPassword: "Las contraseñas no son iguales"
            };
        } else if(size(formData.newPassword) < 6) {
            errorTemp = {
                newPassword: "La contraseña tiene que ser mayor a 5 caracteres",
                repeatPassword: "La contraseña tiene que ser mayor a 5 caracteres"
            }
        } else {
            setIsLoading(true);
            await reauthenticate(formData.password).then(async () => {
                await firebase
                .auth()
                .currentUser.updatePassword(formData.newPassword)
                .then(() => {
                    isSetErrors = false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(() => {
                    errorTemp = {
                        other: "Error al actualizar la contraseña"
                    };
                    setIsLoading(false);
                })
            }).catch(() => {
                errorTemp = {
                    password: "La constraseña es incorrecta"
                };
                setIsLoading(false);
            })
        }
        isSetErrors && setErrors(errorTemp);
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}   
                onChange={e => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Input 
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}  
                onChange={e => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input 
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}  
                onChange={e => onChange(e, "repeatPassword")}
                errorMessage={errors.repeatPassword}
            />
            <Button 
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultValue() {
    return {
        password: "",
        newPassword: "",
        repeatPassword: ""
    };
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
})