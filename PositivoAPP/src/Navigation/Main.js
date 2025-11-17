import React from "react";
import { Platform } from "react-native";
// NavigationContainer should only be used once at the app root (App.js).
// This file exports the navigators only.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";

import Home from "../pages/Home";
import Exames from "../pages/Exames";
import ListarPaciente from "../pages/Listar/ListarPaciente";
import ListarUsuario from "../pages/Listar/ListarUsuario";
import CadastroPaciente from "../pages/Cadastro/CadastroPaciente";
import CadastroUsuario from "../pages/Cadastro/CadastroUsuario";
import AtualizacaoUsuario from "../pages/Atualizacao/AtualizacaoUsuario";
import BuscarExames from "../pages/BuscarExames";
import InserirExame from "../pages/InserirExame";
import VisualizarExame from "../pages/VisualizarExame";
import EditPaciente from "../pages/Atualizacao/AtualizacaoPaciente";

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

function PacienteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista Pacientes"
        component={ListarPaciente}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Atualizar Paciente"
        component={EditPaciente}
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
    <Stack.Navigator initialRouteName="ExamesHome">
      <Stack.Screen
        name="ExamesHome"
        component={Exames}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuscarExames"
        component={BuscarExames}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InserirExame"
        component={InserirExame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VisualizarExame"
        component={VisualizarExame}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator({ usuarioLogado }) {
  const { logout, isAdmin } = useAuth();
  const userIsAdmin = isAdmin();

  return (
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

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "#1827ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
          marginBottom: Platform.OS === "android" ? 50 : 15,
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
        children={(props) => (
          <Home {...props} onLogout={logout} usuarioLogado={usuarioLogado} />
        )}
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
      {/* Apenas admins podem ver e gerenciar pacientes */}
      <Tab.Screen
        name="Pacientes"
        component={PacienteStack}
        options={{
          title: "Pacientes",
          headerTitle: "Lista de Pacientes",
        }}
      />
      {/* Apenas admins podem ver e gerenciar usuários */}
      {userIsAdmin && (
        <Tab.Screen
          name="Usuários"
          component={UsuariosStack}
          options={{
            title: "Usuários",
            headerTitle: "Lista de Usuários",
          }}
        />
      )}
      {/* Apenas admins podem cadastrar pacientes */}
      {userIsAdmin && (
        <Tab.Screen
          name="Cadastrar Paciente"
          component={CadastroPaciente}
          options={{
            title: "Novo Paciente",
            headerTitle: "Cadastrar Paciente",
          }}
        />
      )}
      {/* Apenas admins podem cadastrar usuários */}
      {userIsAdmin && (
        <Tab.Screen
          name="Cadastrar Usuário"
          component={CadastroUsuario}
          options={{
            title: "Novo Usuário",
            headerTitle: "Cadastrar Usuário",
          }}
        />
      )}
    </Tab.Navigator>
  );
}
