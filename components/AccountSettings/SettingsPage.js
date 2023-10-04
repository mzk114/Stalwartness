import ContactCart from "../UI/ContactCart";
import NavbarLayout from "../Layout/NavbarLayout";
import SidebarLayout from "../Layout/SidebarLayout";
import { Col, Row, Container, Card } from "react-bootstrap";
import { useState, useContext } from "react";
import PasswordChange from "./PasswordChange";
import EmailChange from "./EmailChange";
import ProfilePictureChange from "./ProfilePictureChange";
import { UserContext } from "../../store/user-context";

function SettingsPage() {
    const [isCartShow, setIsCartShow] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const showModalCart = () => {
        setIsCartShow(() => true);
    }

    const closeModalCart = () => {
        setIsCartShow(() => false);
    }

    const changePassword = (password) => {
        console.log(password);
        fetch(`http://localhost:5000/changePassword/${user._id}`, {
            method: "PUT",
            body: JSON.stringify(password),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => console.log(res));
    }

    const changeEmail = (data) => {
        console.log(data);
        fetch(`http://localhost:5000/changeEmail/${user._id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => console.log(res));
    }

    return (
        <Row>
            {isCartShow && <ContactCart onClose={closeModalCart} />}
            <NavbarLayout onShowContact={showModalCart} />
            <SidebarLayout />
            <Col xs={10} lg={10} md={10} className="pageWrapper">
                <Container fluid>
                    <Row>
                        <Col xs={12} className="mt-5 mb-5">
                            <Card className="cardOptions m-0">
                                <Row>
                                    <Col xs={3} lg={3} className="m-3">
                                        <label htmlFor="fname" className={`mb-2`}>First Name:</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">Last Name:</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">Email:</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">Phone Number:</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">Role:</label>
                                        <div className="w-100" />
                                    </Col>
                                    <Col xs={3} lg={1} md={1} />
                                    <Col xs={4} lg={3} className="m-3">
                                        <label className="mb-2">{user.name}</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">{user.lastName}</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">{user.email}</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">{user.number_tel}</label>
                                        <div className="w-100" />
                                        <label htmlFor="fname" className="mb-2 personalData">{user.isAdmin ? "Administrator" : "Employee"}</label>
                                        <div className="w-100" />
                                    </Col>
                                    <Col xs={3} lg={3} className="m-3">
                                        <header className="text-center fw-bold">Change Profile Picture</header>
                                        <ProfilePictureChange />
                                    </Col>

                                </Row>
                            </Card>
                        </Col>
                        <Row>
                            <Col sm={12} lg={6} md={6} xl={6}>
                                <PasswordChange password={changePassword} />
                            </Col>
                            <Col sm={12} lg={6} md={6} xl={6} className="">
                                <EmailChange email={changeEmail} />
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default SettingsPage;
