import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {
	const localNfcUser = localStorage.getItem("nfc_user")
	const nfcUserObject = JSON.parse(localNfcUser)

	if (nfcUserObject.staff) {
		return <EmployeeViews />
	} else {
		return <CustomerViews />
	}
}

