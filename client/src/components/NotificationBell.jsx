import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import API from "../services/api";
import "../css/notificationBell.css";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

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

    const unread = notifications.filter(n => !n.isRead).length;

    return (

        <div className="notification-wrapper">

            <button
                className="notification-btn"
                onClick={() => setOpen(!open)}
            >

                <FaBell />

                {

                    unread > 0 &&

                    <span className="notification-count">

                        {unread}

                    </span>

                }

            </button>

            {

                open &&

                <div className="notification-dropdown">

                    <h3>Notifications</h3>

                    {

                        notifications.length === 0 ?

                            <p>No Notifications</p>

                            :

                            notifications.map(item => (

                                <div
                                    key={item._id}
                                    className="notification-item"
                                >

                                    <strong>{item.title}</strong>

                                    <p>{item.message}</p>

                                    {

                                        !item.isRead &&

                                        <button
                                            onClick={() => markRead(item._id)}
                                        >

                                            Mark as Read

                                        </button>

                                    }

                                </div>

                            ))

                    }

                </div>

            }

        </div>

    );

}

export default NotificationBell;