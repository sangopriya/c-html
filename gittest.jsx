import React from 'react'
import './ViewAssociateprofile.component.scss'
import * as AiIcons from 'react-icons/all';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import AddAssociateprofile from  './AddAssociateprofile.component'

const customStyles = {
    content: {
         left: '20%',
         right: '10%',
    },
};
function ViewAssociateprofile() {
   const [listOfAssociateprofiles, setListOfAssociateprofiles] = useState([]);

    let history = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const deleteAssociateprofile = (id, e) => {
        console.log(id);
        axios.delete(`http://localhost:5000/associateprofile/delete/${id}`).then((response) => {
            response.json("deleted successfully");
            history.push("/viewassociateprofile")
        });
    };

    useEffect(() => {
        axios.get("http://localhost:5000/associateprofile/viewassociateprofile").then((response) => {
            setListOfAssociateprofiles(response.data);
            // console.log(response.data);
        });
    }, []);
    console.log(listOfAssociateprofiles);
    return (
        <div className="viewmentor_container" >
            <div className="view_header">
                <div className="view_title">
                    <h3>View AssociateProfile</h3>
                </div>
                <div className="add_staff">
                    <button className="button_click" onClick={openModal}>Add Profile</button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <AddAssociateprofile />
            </Modal>
            <div className="table_container">
                <table cellSpacing="10px" >
                    <tr className="table_row_head">
                        <th className="namehead">Name</th>
                        <th className="emailhead">Email</th>
                        <th>Access Level</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>

                    {/* {listOfMentors.map((value,key) =>{
                    return <div>{value.username}</div>
                })} */}
                    {listOfAssociateprofiles.length > 0 && listOfAssociateprofiles.map((value, key)=> {
                    return (
                            <tr className="table_row">
                                 <td className="namecol">{value.firstname} {value.lastname}</td>
                                <td className="emailcol">{value.email}</td>
                                {/* <td>{value.role}</td> */}
                                <td>{value.phonenumber}</td>
                                <td>
                                    <Link to={`/editprofileviewmentor/${value.id}`}>
                                        <div className="table_icons"><AiIcons.GrEdit className="icons_align" /></div>
                                    </Link>
                                    <Link to={"/"}>
                                        <div className="table_icons"><AiIcons.MdDelete className="icons_align_delete"
                                            onClick={(e) => deleteAssociateprofile(value.id, e)}
                                        /></div>
                                    </Link>
                                    <Link to={`/profileviewmentor/${value.id}`} className="table_icons"><AiIcons.BsFillEyeSlashFill className="icons_align" /></Link>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default ViewAssociateprofile;
