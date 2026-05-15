import { useNavigate, useParams } from "react-router";
import UserForm from "../../components/UserForm/UserForm";
import { useEffect, useState } from "react";
import type { User } from "../../types";
import { getUser } from "../../api/users";


function EditUserPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | undefined>(undefined);
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    getUser(id).then(res => setUser(res.data))
  }, [id])

  if (!user) return <p>Loading…</p>

  return (
    <>
      <UserForm
        initial={user}
        onSuccess={() => {
          navigate('/users')
        }}
        onCancel={() => {
          navigate('/users')
        }}
      />
    </>
  )
}
export default EditUserPage;