import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const CustomerNav = () => {

    const navigate = useNavigate()
    const localNfcUser = localStorage.getItem("nfc_user")
    const nfcUserObject = JSON.parse(localNfcUser)

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__home" to="/" onClick={() => navigate("/")} >🄽🅵🄲✚</Link>
            </li>
            <li className="navbar__item">
            </li>
            {
                localStorage.getItem("nfc_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("nfc_user")
                            navigate("/", { replace: true })
                        }}>{nfcUserObject.fullName}🥷🏿</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}