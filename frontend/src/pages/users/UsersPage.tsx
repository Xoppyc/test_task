import { useState, useEffect } from "react";
import type { User } from "../../types";
import { getUsers } from "../../api/users";
import styles from "./UsersPage.module.scss";
import { useNavigate } from "react-router";

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