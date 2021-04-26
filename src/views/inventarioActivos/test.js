import React, { useState, useEffect} from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CBadge,
    CButton
} from '@coreui/react'
import { Modal, Button } from 'react-bootstrap'
import url from 'src/views/inventarioActivos/config'
import axios from 'axios'
import Swal from 'sweetalert2'

const Test = () =>{
    
    const fields = [
        { key: "idUsuario", label: "Id"},
        "Nombre",
        { key: "Usuario1", label: "Usuario"},
        "Documento",
        { key: "indHabilitado", label: "Estado"},
    ];
    
    const getBadge = status => {
        switch (status) {
            case 1: return 'success'
            case 0: return 'secondary'
            default: return 'primary'
        }
    }

    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        Nombre : "",
        Usuario1 : "",
        indHabilitado : "",
    });
    
    const handleChange = e => {
        const {name,value} = e.target
        setUser({...user,[name]: value})
    }

    const handleClose = () => setShow(false);
    
    const handleShowUser = () => {
        setShow(true);
    }



    const userData = async () => {
        await axios.get(url)
        .then(response =>{
            setUsers(response.data)
        })
        .catch(err => console.log("error"))
    }

    const userAdd = async () => {
        await axios.post(url, user)
        .then(response =>{
            userData(users.concat(response.data))
            handleClose()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch(err => console.log("error" + err))
    }
    
    useEffect(() => {
        userData()
    }, [])
    
    return (
        <CRow>
            <CCol xs="12">
            <CCard>
                <CCardHeader>
                Ejemplo crud con react 
                </CCardHeader>
                <CCardBody>
                <CButton 
                    block color="primary"
                    style={{
                        marginBottom: "14px"
                    }}
                    onClick={handleShowUser}
                >
                Agregar usuario
                </CButton>
                <CDataTable
                fields = {fields}
                items= {users}
                itemsPerPage={10}
                pagination
                scopedSlots={{
                    "indHabilitado":
                    (item)=>(
                        <td>
                            <CBadge color={getBadge(item.indHabilitado)}>
                            {(() => {
                                if (item.indHabilitado === 1) 
                                    return "Activo"
                                else
                                    return "Inactivo"
                            })()}
                            </CBadge>
                        </td>
                    )
                }}
    
    
                />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>Nombre</label>
                            <input className="form-control" type="text" name="Nombre" onChange={handleChange}></input>
                            <label>Usuario</label>
                            <input className="form-control" type="text" name="Usuario1" onChange={handleChange}></input>
                            <label>Documento</label>
                            <input className="form-control" type="text" name="Documento" onChange={handleChange}></input>
                            <label>Estado</label>
                            <select className="form-control" defaultValue="" name="indHabilitado" onChange={handleChange}>
                                <option disabled value="">Seleccione un estado</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={userAdd}>
                        Guardar Cambios
                    </Button>
                    </Modal.Footer>
                </Modal>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
    )
}

export default Test
