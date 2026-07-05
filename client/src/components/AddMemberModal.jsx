import { useEffect, useState } from "react";
import API from "../services/api";

function AddMemberModal({ projectId, refresh, close }) {

    const [users, setUsers] = useState([]);

    const [userId, setUserId] = useState("");

    const [role, setRole] = useState("Member");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const res = await API.get("/users");

            setUsers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/members", {

                project: projectId,

                userId,

                role

            });

            alert("Member Added");

            refresh();

            close();

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <div className="modal">

            <div className="modal-box">

                <h2>Add Member</h2>

                <form onSubmit={submit}>

                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    >

                        <option value="">
                            Select User
                        </option>

                        {

                            users.map(user => (

                                <option
                                    key={user._id}
                                    value={user._id}
                                >

                                    {user.name} ({user.email})

                                </option>

                            ))

                        }

                    </select>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <option>Member</option>

                        <option>Owner</option>

                    </select>

                    <div className="modal-buttons">

                        <button>

                            Add Member

                        </button>

                        <button
                            type="button"
                            onClick={close}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddMemberModal;