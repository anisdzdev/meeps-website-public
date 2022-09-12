import React from 'react';
import {Row, Col, Container} from 'reactstrap';

function AboutUs() {

    return (
        <div id="about-us-section">
            <Container>
                <div id="about-us-cloud">
                    <Row>
                        <Col id="about-image-cols" xs={{size: 12, order: 2}} lg={{size: 6, order: 1}}>
                            <Container>
                                <Row className="about-meeps-row">
                                    <Col className="about-cell">
                                        <img src={require("../../assets/images/website-gen-12.png")} alt="1st MEEP"/>
                                    </Col>
                                    <Col className="about-cell">
                                        <img src={require("../../assets/images/website-gen-1.png")}
                                             alt="1st MEEP"/></Col>
                                    <Col className="about-cell d-none d-lg-block">
                                        <img src={require("../../assets/images/website-gen-2.png")}
                                             alt="1st MEEP"/></Col>
                                    <Col className="about-cell d-none d-lg-block">
                                        <img src={require("../../assets/images/website-gen-3.png")}
                                             alt="1st MEEP"/></Col>
                                </Row>
                                <Row className="about-meeps-row">
                                    <Col className="about-cell">
                                        <img src={require("../../assets/images/website-gen-4.png")}
                                             alt="1st MEEP"/></Col>
                                    <Col className="about-cell">
                                        <img src={require("../../assets/images/website-gen-5.png")}
                                             alt="1st MEEP"/></Col>
                                    <Col className="about-cell d-none d-lg-block">
                                        <img src={require("../../assets/images/website-gen-6.png")}
                                             alt="1st MEEP"/></Col>
                                    <Col className="about-cell d-none d-lg-block">
                                        <img src={require("../../assets/images/website-gen-7.png")}
                                             alt="1st MEEP"/></Col>
                                </Row>
                                <Row>
                                    <Col className="about-cell"> <img
                                        src={require("../../assets/images/website-gen-8.png")}
                                        alt="1st MEEP"/>
                                    </Col>
                                    <Col className="about-cell"> <img
                                        src={require("../../assets/images/website-gen-9.png")}
                                        alt="1st MEEP"/>
                                    </Col>
                                    <Col className="about-cell d-none d-lg-block"> <img
                                        src={require("../../assets/images/website-gen-10.png")}
                                        alt="1st MEEP"/>
                                    </Col>
                                    <Col className="about-cell d-none d-lg-block"> <img
                                        src={require("../../assets/images/website-gen-11.png")}
                                        alt="1st MEEP"/>
                                    </Col>
                                </Row>
                            </Container>

                        </Col>
                        <Col xs={{size: 12, order: 1}} lg={{size: 6, order: 2}}>
                            <div id="about-us-text-div">
                                <h2 id="about-us-title">About Us</h2>

                                <div id="about-us-description">
                                    <p className="about-desc-title">What are MEEPS?</p>

                                    <p className="about-desc-text">MEEPS is a story based NFT project following 5
                                        friends,
                                        Moe, Eve, Eik,
                                        Pip and Syd as they discover and explore a magical world... </p>

                                    <p className="about-desc-title">What is the supply?</p>

                                    <p className="about-desc-text">5,555 MEEPS.</p>

                                    <p className="about-desc-title">How much will it cost?</p>

                                    <p className="about-desc-text">Nothing ! MEEPS is a FREE MINT... you just have to
                                        cover
                                        gas.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>

    );
}

export default AboutUs