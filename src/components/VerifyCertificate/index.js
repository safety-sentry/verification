import React, {useState} from "react";
import "./index.css";
import VerifyCertificateImg from "../../assets/img/verify-certificate.png"
import SampleCertificateImg from "../../assets/img/sample_ceritificate.png"
import ValidCertificateImg from "../../assets/img/ValidCertificate.png"
import InvalidCertificateImg from "../../assets/img/InvalidCertificate.jpeg"
import QRCodeImg from "../../assets/img/qr-code.svg"
import {CertificateStatus} from "../CertificateStatus";
import {CustomButton} from "../CustomButton";
import QRScanner from "../QRScanner";
import JSZip from "jszip";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const CERTIFICATE_FILE = "certificate.json";

export const VerifyCertificate = () => {
    const [result, setResult] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const handleScan = data => {
        if (data) {
            const zip = new JSZip();
            zip.loadAsync(data).then((contents) => {
                return contents.files[CERTIFICATE_FILE].async('text')
            }).then(function (contents) {
                setResult(contents)
            }).catch(err => {
                    setResult(data)
                }
            );

        }
    };
    const handleError = err => {
        console.error(err)
    };
    return (
        <div className="container-fluid verify-certificate-wrapper">
            {
                !result &&
                <>
                    {!showScanner &&
                    <>
                        <img src={VerifyCertificateImg} className="banner-img" alt="banner-img" style={{ marginTop:50 }}/>
                        <h3 className="text-center">Verify your vaccination certificate</h3>
                        <CustomButton className="green-btn" onClick={() => setShowScanner(true)}>
                            <span>Scan QR code</span>
                            <img className="ml-3" src={QRCodeImg} alt={""}/>
                        </CustomButton>
                        <Container className="mt-5 p-4 mb-5">
                            <h5>Troubleshooting :</h5>
                            <ul>
                                <li>The QR scan can take a bit long time. So please have patience</li>
                                <li>After 2~3 retry, if your certificate QR not detected, Fill this form with all details <a href="https://docs.google.com/forms/d/e/1FAIpQLSddh8frBkGj7kMkzGgz9N-_MjApcKCk975KCxYmC7Tr7f6R4w/viewform?usp=sf_link">👉 CLICK HERE TO OPEN FORM 👈</a><br></br>Certificate will be updated within 3~4 hours.</li>
                                <li>If you face any error, Don't reload this page. Go to the app and click on the button. Then retry .</li>
                            </ul>
                        </Container>
                    </>}
                    {showScanner &&
                    <>
                        <QRScanner onError={handleError}
                                   onScan={handleScan}/>
                        <CustomButton className="green-btn" onClick={() => setShowScanner(false)}>BACK</CustomButton>
                    </>
                    }
                </>
            }
            {
                result && <CertificateStatus certificateData={result} goBack={() => {
                    setShowScanner(false);
                    setResult("");
                }
                }/>
            }


        </div>
    )
};
