import UserForm from "../(componenets)/UserForm"

const CreateUser = () => {
  return (
    <div className="text-center">
        <h1>Only ADMINS!</h1>
        <UserForm/>
    </div>
  )
}

export default CreateUser