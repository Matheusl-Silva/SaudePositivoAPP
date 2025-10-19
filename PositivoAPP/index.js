import { registerRootComponent } from "expo";

import App from "./App";
import Dev from "./src/pages/Cadastro/CadastroPaciente";
import Main from "./src/Navigation/Main";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
