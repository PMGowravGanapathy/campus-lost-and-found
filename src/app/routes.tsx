import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WebLayout } from "./components/design-system/WebLayout";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { PostItemScreen } from "./screens/PostItemScreen";
import { ItemDetailScreen } from "./screens/ItemDetailScreen";
import { ClaimFlowScreen } from "./screens/ClaimFlowScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AdminDashboardScreen } from "./screens/AdminDashboardScreen";
import { DesignSystemScreen } from "./screens/DesignSystemScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/design-system",
    Component: DesignSystemScreen,
  },
  {
    Component: WebLayout,
    children: [
      {
        path: "/home",
        Component: HomeScreen,
      },
      {
        path: "/item/:id",
        Component: ItemDetailScreen,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "/post",
            Component: PostItemScreen,
          },
          {
            path: "/claim/:id",
            Component: ClaimFlowScreen,
          },
          {
            path: "/chat/:id",
            Component: ChatScreen,
          },
          {
            path: "/profile",
            Component: ProfileScreen,
          },
          {
            path: "/admin",
            Component: AdminDashboardScreen,
          },
        ]
      }
    ]
  }
]);
