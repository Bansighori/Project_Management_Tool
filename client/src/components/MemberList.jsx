import {useEffect,useState} from "react";
import API from "../services/api";

function MemberList({projectId}){

const[members,setMembers]=useState([]);

useEffect(()=>{

loadMembers();

},[]);

const loadMembers=async()=>{

const res=await API.get(`/members/${projectId}`);

setMembers(res.data);

};

return(

<div className="member-box">

<h3>Team Members</h3>

{

members.map(member=>(

<div
key={member._id}
className="member-item"
>

<div>

<strong>

{member.user.name}

</strong>

<br/>

{member.user.email}

</div>

<span>

{member.role}

</span>

</div>

))

}

</div>

);

}

export default MemberList;