import { createBrowserRouter } from "react-router-dom";
import AccessUsers from "./src/components/AccessUsers";
import AdminLayout from "./src/components/AdminLayout";
import AnnouncementView from "./src/components/AnnouncementView";
import ChatPanel from "./src/components/ChatPanel";
import GuestLayout from "./src/components/GuestLayout";
import StudentAnnouncementView from "./src/components/StudentAnnouncementView";
import UserLayout from "./src/components/UserLayout";
import Announcement from "./src/views/Announcement";
import Chat from "./src/views/Chat";
import Dashboard from "./src/views/Dashboard";
import Login from "./src/views/Login";
import PageNotFound from "./src/views/PageNotFound";
import Quiz from "./src/views/Quiz";
import QuizView from "./src/views/QuizView";
import Signup from "./src/views/Signup";
import StudentQuiz from "./src/views/StudentQuiz";
import StudentQuizView from "./src/views/StudentQuizView";
import UserForm from "./src/views/UserForm";
import Users from "./src/views/Users";
import Profile from "./src/views/profile";
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
        path: "/users/edit/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/chat",
        element: <ChatPanel />,
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
        path: "/quiz/:id",
        element: <QuizView />,
      },
      {
        path: "/announcement",
        element: <Announcement />,
      },
      {
        path: "/quizzes/access-users/:slug",
        element: <AccessUsers />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/quiz/public/:slug",
        element: <StudentQuizView />,
      },
    ],
  },
  {
    path: "/student",
    element: <UserLayout />,
    children: [
      {
        path: "Announcement",
        element: <StudentAnnouncementView />,
      },
      {
        path: "myquizzes",
        element: <StudentQuiz />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
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
      {
        path: "/quiz/public/:slug",
        element: <StudentQuizView />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default router;
