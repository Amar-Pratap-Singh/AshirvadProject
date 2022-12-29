import React from 'react';
import Navbar from '../Navbar';
import ManagerAssignCard from '../ManagerAssignCard';

function AssignComplaints(props){
    return (
        <div>
        <Navbar props={props}/>

        <div class="center_div">
            <h1>Assign Complaints</h1>
            
            {props.allPlumberData.map((doc, index) => (
                <div>
                    <ManagerAssignCard 
                    index={index} 
                    plumberUsername={doc.username} 
                    navigator={props.navigator}
                    complaintToAssign={props.complaintToAssign}
                    />
                    <br></br>
                </div>
            ))}
        </div>
    </div>
    );
}

export default AssignComplaints;