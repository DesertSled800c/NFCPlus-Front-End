import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"


export const NavBar = () => {
    const localNfcUser = localStorage.getItem("nfc_user")
    const nfcUserObject = JSON.parse(localNfcUser)

    if (nfcUserObject.staff) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}

