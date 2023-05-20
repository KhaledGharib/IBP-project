import { useStateContext } from "../../context/useStateContext";
export default function Profile() {
  const { user, token } = useStateContext();

  return (
    <div className=" container p-2 rounded-2 shadow d-flex justify-content-between align-items-center">
      <div className="">
        <p>
          Name: <span>{user.name}</span>
        </p>
        <p>
          Student ID: <span>{user.studentID}</span>
        </p>
        <p>
          Email Address: <span>{user.email}</span>
        </p>
      </div>
      <div>
        <img
          className="profile-avatar"
          src="../../img/photo-1510227272981-87123e259b17.jpeg"
        />
      </div>
    </div>
  );
}
