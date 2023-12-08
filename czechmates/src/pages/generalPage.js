
import React, { useEffect, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavWithDD from '../components/NavWithDropdown';
import { db } from '../firebase';
import { child, get, ref, set, push, update, onValue } from "firebase/database";

// this component houses the content for the general character info
// input the general character information, the user id and the character id
const GeneralPage = ({participation, generalInfo, userId, charId, userTheme }) => {

    var [ imgSrc, setImgSrc ] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC')

    function setPic(newImg){
        setImgSrc(newImg);
        console.log(newImg);
        var userRef = ref(db);
        const updates = {};
        updates['Characters/'+charId+'/General/ImageURL'] = newImg;
        update(userRef, updates);
    }
    
    useEffect(() => {
        if (charId !== undefined){
            // console.log("check char id in sub", charId);
            // use this path and onValue monitors for changes
            console.log(charId);
        const charRef = ref(db, 'Characters/' + charId);
        onValue(charRef, (snapshot) => {
            // setCharInfo(snapshot.val());
            console.log("LOOK HERE");
            console.log(snapshot.val().General.ImageURL);
            setImgSrc(snapshot.val().General.ImageURL);
        });  
        }
    }, [charId])

    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 fullWindow">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 className={"text-center body_"+userTheme}>
                            General
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ borderStyle: "solid", textAlign: "center" }}>
                        {/* <InputWithLabel category={"Img Url"} label={"Image Url"}   /> */}
                        <input type="text " value={imgSrc} onChange={(e)=>{setPic(e.target.value)}} />
                        <img width='200vh' src={imgSrc}/>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        <InputWithLabel participation={participation} charId={charId} userId={userId} category={"General"} label={"Name"} content={generalInfo?.Name} disabled={false} />
                        <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Level"} content={generalInfo?.Level} disabled={true} />
                        <InputWithLabel charId={charId} userId={userId} category={"General"} label={"High Concept"} content={generalInfo?.High_Concept} disabled={false} />
                    </Col>
                </Row>
                {/* each one is editable and has a label as well as a placeholder value */}
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Trouble"} content={generalInfo?.Trouble} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Aspect 1"} content={generalInfo?.Aspect_1} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Aspect 2"} content={generalInfo?.Aspect_2} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Fate Points"} content={generalInfo?.Fate_Points} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Money"} content={generalInfo?.Money} disabled={false} />
                {/* the description section is labeled individually */}
                <Form.Label htmlFor="this">Description</Form.Label>
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Physical Appearance"} content={generalInfo?.Physical_Appearance} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Background"} content={generalInfo?.Background} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Major Relationships"} content={generalInfo?.Major_Relationships} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Other"} content={generalInfo?.Other} disabled={false} />
            </Container>
        </div>
    );
};

export default GeneralPage;