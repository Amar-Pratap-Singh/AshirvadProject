import React from 'react';
import Navbar from '../Navbar';
import ManagerCard from '../ManagerCard';

function AllComplaints(props){
    return (
        <div>
            <Navbar props={props}/>

            <div class="center_div">
                <h1>All Complaints</h1>
                
                {props.allComplaintData.map((doc, index) => (
                    <div>
                        <ManagerCard 
                        index={index} 
                        status={doc.status} 
                        complaintID={props.allComplaintIDs[index]} 
                        customerUsername={doc.username} 
                        complaint={doc.complaint}
                        setComplaintToAssign={props.setComplaintToAssign}
                        navigator={props.navigator}
                        />
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllComplaints;