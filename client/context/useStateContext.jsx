import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  message: null,
  announcement: null,
  quizzes: [],
  questionTypes: [],
  setUser: () => {},
  setToken: () => {},
  setMessage: () => {},
  setAnnouncement: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [announcement, setAnnouncement] = useState({});
  const [message, _setMessage] = useState("");
  const setMessage = (message) => {
    _setMessage(message);
    setTimeout(() => {
      _setMessage("");
    }, 5000);
  };

  const tempQuiz = [
    {
      id: 1,
      image_url:
        "https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg?w=900&t=st=1682703653~exp=1682704253~hmac=634f9e068729a3d0ed3f8be1ec869d4602f277a348beac45f84db8caa7814c7f",
      title: "Math",
      slug: "math quiz",
      status: true,
      description: "midterm",
      created_at: "",
      updated_at: "",
      expire_date: "",
      questions: [
        {
          id: 24,
          type: "text",
          question: "Form which counter are you?",
          description: null,
        },
        {
          id: 26,
          type: "select",
          question: "Which JavaScript do you want to see on the chanel",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "a36336bb-3f64-471d-a1ba-b47780ba9860",
                text: "React.js",
              },
              {
                uuid: "9b6b6d3b-5d32-4594-a5b4-5170f960bf8c",
                text: "Vue.js",
              },
              {
                uuid: "07216e8f-c279-4954-83f8-51628921c0f6",
                text: "Angular.js",
              },
              {
                uuid: "bef68fa2-cc4b-4ba3-915f-5fb2f1aaff93",
                text: "none of the above",
              },
            ],
          },
        },
        {
          id: 27,
          type: "checkbox",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "0f7f4b96-3894-43be-9560-4bc72295e241",
                text: "HTML",
              },
              {
                uuid: "f91a182f-edf7-46b5-8f67-bd3acc459185",
                text: "PHP",
              },
              {
                uuid: "b7351c58-cebe-4761-96af-57dc36ecb030",
                text: "GO",
              },
              {
                uuid: "6f7dbba0-02eb-4a3e-8a88-c745de954413",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 24,
          type: "radio",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "d52b7b0a-b101-455d-bd7a-c58e4d488740",
                text: "HTML",
              },
              {
                uuid: "6bb0e5c5-3609-48ec-bda9-14385d690562",
                text: "PHP",
              },
              {
                uuid: "e6a42854-13aa-402e-9c26-129955063ac8",
                text: "GO",
              },
              {
                uuid: "18e989d1-2d1e-4376-acab-3d3f1f7c6964",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 30,
          type: "textarea",
          question: "what do you like?",
          description: "write anything",
          data: [],
        },
      ],
    },
    {
      id: 2,
      image_url:
        "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=900&t=st=1682703703~exp=1682704303~hmac=a69c73d9a6d848594e9f883f152e4c8a131f0e2f047a7cc2f0c667b62f4f5f4a",
      title: "coding",
      slug: "coding quiz",
      status: true,
      description: "midterm",
      created_at: "",
      updated_at: "",
      expire_date: "",
      questions: [
        {
          id: 24,
          type: "text",
          question: "Form which counter are you?",
          description: null,
        },
        {
          id: 26,
          type: "select",
          question: "Which JavaScript do you want to see on the chanel",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "a36336bb-3f64-471d-a1ba-b47780ba9860",
                text: "React.js",
              },
              {
                uuid: "9b6b6d3b-5d32-4594-a5b4-5170f960bf8c",
                text: "Vue.js",
              },
              {
                uuid: "07216e8f-c279-4954-83f8-51628921c0f6",
                text: "Angular.js",
              },
              {
                uuid: "bef68fa2-cc4b-4ba3-915f-5fb2f1aaff93",
                text: "none of the above",
              },
            ],
          },
        },
        {
          id: 27,
          type: "checkbox",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "0f7f4b96-3894-43be-9560-4bc72295e241",
                text: "HTML",
              },
              {
                uuid: "f91a182f-edf7-46b5-8f67-bd3acc459185",
                text: "PHP",
              },
              {
                uuid: "b7351c58-cebe-4761-96af-57dc36ecb030",
                text: "GO",
              },
              {
                uuid: "6f7dbba0-02eb-4a3e-8a88-c745de954413",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 24,
          type: "radio",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "d52b7b0a-b101-455d-bd7a-c58e4d488740",
                text: "HTML",
              },
              {
                uuid: "6bb0e5c5-3609-48ec-bda9-14385d690562",
                text: "PHP",
              },
              {
                uuid: "e6a42854-13aa-402e-9c26-129955063ac8",
                text: "GO",
              },
              {
                uuid: "18e989d1-2d1e-4376-acab-3d3f1f7c6964",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 30,
          type: "textarea",
          question: "what do you like?",
          description: "write anything",
          data: [],
        },
      ],
    },
    {
      id: 3,
      image_url:
        "https://img.freepik.com/free-vector/artistic-background-with-palette-paints_1284-10291.jpg?w=740&t=st=1682703770~exp=1682704370~hmac=fbbf5e51ff9dd9da9d4ba9c6f834e353c74b735e7139f518c37b4790be4a918f",
      title: "draw",
      slug: "draw quiz",
      status: true,
      description: "midterm",
      created_at: "",
      updated_at: "",
      expire_date: "",
      questions: [
        {
          id: 24,
          type: "text",
          question: "Form which counter are you?",
          description: null,
        },
        {
          id: 26,
          type: "select",
          question: "Which JavaScript do you want to see on the chanel",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "a36336bb-3f64-471d-a1ba-b47780ba9860",
                text: "React.js",
              },
              {
                uuid: "9b6b6d3b-5d32-4594-a5b4-5170f960bf8c",
                text: "Vue.js",
              },
              {
                uuid: "07216e8f-c279-4954-83f8-51628921c0f6",
                text: "Angular.js",
              },
              {
                uuid: "bef68fa2-cc4b-4ba3-915f-5fb2f1aaff93",
                text: "none of the above",
              },
            ],
          },
        },
        {
          id: 27,
          type: "checkbox",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "0f7f4b96-3894-43be-9560-4bc72295e241",
                text: "HTML",
              },
              {
                uuid: "f91a182f-edf7-46b5-8f67-bd3acc459185",
                text: "PHP",
              },
              {
                uuid: "b7351c58-cebe-4761-96af-57dc36ecb030",
                text: "GO",
              },
              {
                uuid: "6f7dbba0-02eb-4a3e-8a88-c745de954413",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 24,
          type: "radio",
          question: "Which language are use for backend",
          description: "choose the right one",
          data: {
            options: [
              {
                uuid: "d52b7b0a-b101-455d-bd7a-c58e4d488740",
                text: "HTML",
              },
              {
                uuid: "6bb0e5c5-3609-48ec-bda9-14385d690562",
                text: "PHP",
              },
              {
                uuid: "e6a42854-13aa-402e-9c26-129955063ac8",
                text: "GO",
              },
              {
                uuid: "18e989d1-2d1e-4376-acab-3d3f1f7c6964",
                text: "JAVA",
              },
            ],
          },
        },
        {
          id: 30,
          type: "textarea",
          question: "what do you like?",
          description: "write anything",
          data: [],
        },
      ],
    },
  ];

  const [quizzes, setQuizzes] = useState(tempQuiz);
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);

  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        message,
        setMessage,
        quizzes,
        questionTypes,
        setAnnouncement,
        announcement,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
