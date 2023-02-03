import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">
                    <button onClick={() => navigate("/")} >NFC+</button></Link>
            </li>
            <li className="navbar__item">
                <button className="navbar__toggle"> Toggle Mode</button>
            </li>
            {
                localStorage.getItem("nfc_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("nfc_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}