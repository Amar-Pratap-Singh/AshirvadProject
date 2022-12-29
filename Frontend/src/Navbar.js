import React from 'react';


function Navbar(props){
    return (
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
            <img src="https://www.kindpng.com/picc/m/3-35232_water-drop-png-download-aqua-saver-water-level.png" width="30" height="30" class="profile-pic d-inline-block align-top profile-pic" alt="Logo"></img>
                ashirvad
            </a>   

            <span>
                <a class="navbar-brand" href="#">
                    <img src="https://freesvg.org/img/abstract-user-flat-4.png" width="30" height="30" class="d-inline-block align-top profile-pic" alt=""></img>
                    { props.props.userDetails.userName }
                </a> 
                {/* <button class="btn btn-primary" onClick={props.props.demoPage} type="submit">Demo Page</button> */}
                <button class="btn btn-primary" onClick={props.props.logOut} type="submit">Log out</button>
            </span> 
        </nav>
    );
}

export default Navbar;