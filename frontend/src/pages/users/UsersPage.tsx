import { useState, useEffect } from "react";
import type { User } from "../../types";
import { deleteUsers, getUsers } from "../../api/users";
import styles from "./UsersPage.module.scss";
import { useNavigate } from "react-router";
import { Trash } from "lucide-react";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('sadas');
    getUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    try {
      await deleteUsers(id)
      setUsers(prev => prev.filter(u => u._id !== id))
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        <span className={styles.count}>{users.length} records</span>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.empty}>Loading…</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className={styles.row}
                  onClick={() => navigate(`/users/${u._id}`)}
                >
                  <td className={styles.id}>{u._id}</td>
                  <td className={styles.name}>{u.name}</td>
                  <td className={styles.email}>{u.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, u._id)}>
                      <Trash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UsersPage;