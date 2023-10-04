import classes from "./ProfilePictureChange.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/user-context";

function ProfilePictureChange() {
    const [isUpload, setIsUpload] = useState(false);
    const [message, setMessage] = useState("");
    const { user, setUser } = useContext(UserContext);

    const changePicture = (pict) => {
        const formData = new FormData();
        formData.append("picture", pict);
        console.log(pict);
        fetch(`http://localhost:5000/CurrentUser/${user._id}`, {
            method: "PUT",
            body: formData,
            headers: {
                Accept: "application/form-data",
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then((res) => {
                setUser((prev) => {
                    return { ...prev, picture: res.picture };
                });
                setIsUpload(() => true);
                setMessage(() => "Profile picture updated successfully!");
            });
    }

    useEffect(() => {
        const time = setTimeout(() => {
            setIsUpload(() => false);
        }, 2000);
        return () => {
            clearTimeout(time);
        };
    }, [isUpload]);

    return (
        <>
            <p className={classes.sidebarProfileImg}>
                <img
                    alt="alt"
                    src={user.picture}
                />
            </p>
            <label className={classes.sidebarProfileImg}>
                <input
                    className="text-center"
                    style={{ color: "black" }}
                    type="file"
                    onChange={(e) => {
                        changePicture(e.target.files[0]);
                    }}
                />
            </label>
            {isUpload && <p style={{ color: "#90EE90" }} className="mt-2 text-nowrap">{message}</p>}
        </>
    );
}

export default ProfilePictureChange;
