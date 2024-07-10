import { useEffect, useState } from "react";
import useSetNewPassword from "./useSetNewPassword";
import { useLocation } from "react-router-dom";

export default function ResetPasswordForm() {
  const { updatePassword, isUpdating } = useSetNewPassword();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();

	const token = new URLSearchParams(location.search).get("token");

	useEffect(() => {
		if (!token) {
			alert("error")
		}
	}, [token]);
  
  function handleSubmit(e){
    e.preventDefault();
    if (newPassword !== confirmPassword) {
			console.log("password does not match");
			return;
		}
    updatePassword(newPassword);
  }
  return (
		<form onClick={handleSubmit}>
			<label>New Password</label>
			<input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
			<br />
			<br />
			<label>Confirm Password</label>
			<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit" disabled={isUpdating}>Submit</button>
		</form>
	);
}
