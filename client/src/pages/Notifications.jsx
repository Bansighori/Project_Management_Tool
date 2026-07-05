import { useEffect, useState } from "react";
import API from "../services/api";
import "../css/notification.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const res = await API.get("/notifications");

            setNotifications(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const markRead = async (id) => {

        try {

            await API.put(`/notifications/${id}`);

            loadNotifications();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="notification-page">

            <h1>Notifications</h1>

            {

                notifications.length === 0 ?

                    <h3>No Notifications</h3>

                    :

                    notifications.map(notification => (

                        <div
                            key={notification._id}
                            className={`notification-card ${notification.isRead ? "read" : "unread"}`}
                        >

                            <h3>{notification.title}</h3>

                            <p>{notification.message}</p>

                            <small>

                                {new Date(notification.createdAt).toLocaleString()}

                            </small>

                            {

                                !notification.isRead &&

                                <button
                                    onClick={() => markRead(notification._id)}
                                >

                                    Mark as Read

                                </button>

                            }

                        </div>

                    ))

            }

        </div>

    );

}

export default Notifications;