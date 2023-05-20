import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./src/components/AdminLayout";
import AnnouncementView from "./src/components/AnnouncementView";
import GuestLayout from "./src/components/GuestLayout";
import UserLayout from "./src/components/UserLayout";
import Announcement from "./src/views/Announcement";
import Chat from "./src/views/Chat";
import Dashboard from "./src/views/Dashboard";
import Login from "./src/views/Login";
import PageNotFound from "./src/views/PageNotFound";
import Profile from "./src/views/profile";
import Quiz from "./src/views/Quiz";
import QuizView from "./src/views/QuizView";
import Signup from "./src/views/Signup";
import UserForm from "./src/views/UserForm";
import Users from "./src/views/Users";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/quizzes",
        element: <Quiz />,
      },
      {
        path: "/quizzes/create",
        element: <QuizView />,
      },
      {
        path: "/announcement",
        element: <Announcement />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/student",
    element: <UserLayout />,
    children: [
      {
        path: "inbox",
        element: <AnnouncementView />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
