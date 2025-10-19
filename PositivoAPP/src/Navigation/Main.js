import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "../pages/Home";
import ListarPaciente from "../pages/Listar/ListarPaciente";
import ListarUsuario from "../pages/Listar/ListarUsuario";
import CadastroPaciente from "../pages/Cadastro/CadastroPaciente";
import CadastroUsuario from "../pages/Cadastro/CadastroUsuario";
import AtualizacaoUsuario from "../pages/Atualizacao/AtualizacaoUsuario";
import ExameHematologico from "../pages/Exames/Hematologico";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UsuariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaUsuarios"
        component={ListarUsuario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Atualizar Usuário"
        component={AtualizacaoUsuario}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function ExamesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaExames"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exame Hematológico"
        component={ExameHematologico}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Exames") {
              iconName = focused ? "flask" : "flask-outline";
            } else if (route.name === "Pacientes") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Usuários") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Cadastrar Paciente") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Cadastrar Usuário") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1827ff",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: "#ffff",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Início",
            headerTitle: "Saúde Positivo",
          }}
        />
        <Tab.Screen
          name="Exames"
          component={ExamesStack}
          options={{
            title: "Exames",
            headerTitle: "Exames Laboratoriais",
          }}
        />
        <Tab.Screen
          name="Pacientes"
          component={ListarPaciente}
          options={{
            title: "Pacientes",
            headerTitle: "Lista de Pacientes",
          }}
        />
        <Tab.Screen
          name="Usuários"
          component={UsuariosStack}
          options={{
            title: "Usuários",
            headerTitle: "Lista de Usuários",
          }}
        />
        <Tab.Screen
          name="Cadastrar Paciente"
          component={CadastroPaciente}
          options={{
            title: "Novo Paciente",
            headerTitle: "Cadastrar Paciente",
          }}
        />
        <Tab.Screen
          name="Cadastrar Usuário"
          component={CadastroUsuario}
          options={{
            title: "Novo Usuário",
            headerTitle: "Cadastrar Usuário",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
