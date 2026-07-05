import { FaSearch, FaUserCircle } from "react-icons/fa";
import NotificationBell from "./NotificationBell";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="navbar">

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search Projects..."
                />

            </div>

            <div className="navbar-right">

                <NotificationBell />

                <div className="profile">

                    <FaUserCircle size={32} />

                    <span>

                        {user?.name}

                    </span>

                </div>

            </div>

        </header>

    );

}

export default Navbar;