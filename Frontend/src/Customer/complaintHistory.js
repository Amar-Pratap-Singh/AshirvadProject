import React from 'react';
import Navbar from '../Navbar';


function ViewComplaintHistory(props){

    return (
        <div>
            <Navbar props={props} />
            
            <div class="center_div">
                <h1>Your Complaints</h1>
                <ul>
                    {Object.entries(props.userComplaintsHistory).map((key, value) => (
                        <div class="card">
                            <div class="card-body">
                                {key[1]}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ViewComplaintHistory;