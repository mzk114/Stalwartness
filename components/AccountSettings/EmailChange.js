import { Col } from "react-bootstrap";
import { Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from 'react';

function EmailChange(props) {

    const [passwordEmail, setPasswordEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");

    const sendDataEmail = (e) => {
        e.preventDefault();

        if (oldEmail !== newEmail) {
            setIsEmail(() => false);
            setEmailMessage(() => "Incorrect data!");
        } else {
            setIsEmail(() => true);
            setEmailMessage(() => "Email address changed successfully");
            const data = {
                new_email: newEmail,
                password: passwordEmail,
            };
            props.email(data);
            setNewEmail(() => "");
            setOldEmail(() => "");
            setPasswordEmail(() => "");
        }
    };

    return (
        <form onSubmit={sendDataEmail}>
            <Col sm={12}>
                <Card className="cardOptions">
                    <CardHeader title={<header>Change Email Address</header>} />
                    <CardContent>
                        <TextField
                            label="Enter password"
                            variant="standard"
                            fullWidth
                            type="password"
                            value={passwordEmail}
                            onChange={(e) => setPasswordEmail(() => e.target.value)}
                        />
                        <TextField
                            label="Enter old email address"
                            variant="standard"
                            fullWidth
                            type="email"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(() => e.target.value)}
                        />
                        <TextField
                            label="Repeat new email address"
                            variant="standard"
                            fullWidth
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(() => e.target.value)}
                        />
                    </CardContent>
                    <CardActions>
                        <button className="redBtn m-1" type="submit" style={{ borderRadius: "0" }}>
                            Confirm
                        </button>
                    </CardActions>
                </Card>
            </Col>
        </form>
    );
}

export default EmailChange;
