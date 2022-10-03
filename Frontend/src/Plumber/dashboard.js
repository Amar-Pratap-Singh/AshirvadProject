import React from 'react';


function PlumberDashboard(props){

    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand" href="#">
                    <img src="https://www.kindpng.com/picc/m/298-2987120_plumbing-white-icon-png-clipart-png-download-sign.png" width="30" height="30" class="profile-pic d-inline-block align-top profile-pic" alt=""></img>
                    Ashirvad
                </a>   

                <span>
                    <a class="navbar-brand" href="#">
                        <img src="https://freesvg.org/img/abstract-user-flat-4.png" width="30" height="30" class="d-inline-block align-top profile-pic" alt=""></img>
                        { props.userDetails.userName }
                    </a> 
                    <button class="btn btn-primary" onClick={props.logOut} type="submit">Log out</button>
                </span> 
            </nav>

            <div class="center_div">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}

export default PlumberDashboard;