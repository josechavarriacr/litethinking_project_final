import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { BsFillPencilFill, BsTrash } from 'react-icons/bs'
import { Button, Container, Input, Table } from 'reactstrap'
import './App.css'
import { AddModal } from './components/AddModal'
import { EditModal } from './components/EditModal'
import { ApiToolsDeleteFn, ApiToolsLoadAxios } from './utils/api-utils'

function App() {
    const initialState = [
        {
            id: 1,
            name: 'Jose',
            lastname: 'Chavarria',
            email: 'chavarria@gmail.com',
            admin: true,
            language: 'ES',
        },
        {
            id: 2,
            name: 'Rafael',
            lastname: 'Cascante',
            email: 'cascante@outlook.com',
            admin: false,
            language: 'EN',
        },
    ]

    const [data, setData] = useState(initialState)

    // Modal
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [item, setItem] = useState({})

    // operations
    const insertFn = () => setShowAddModal(true)
    
    const restartFn = () => setData(initialState)

    const editFn = (item) => {
        setShowEditModal(true)
        setItem(item)
    }

    const deleteFn = (id) => {
        let opcion = window.confirm('Are you sure you want to delete: ' + id)
        if (!opcion) return false
        const result = ApiToolsDeleteFn(id, data)
        setData(result)
    }

    

    const loadAxios = async () => {
        const result = await ApiToolsLoadAxios()
        setData(result)
    }

    return (
        <>
            <Container>
                <h1>Hello World!</h1>
                <h2>from production!</h2>
                <br></br>
                <Button
                    color="success"
                    onClick={() => insertFn()}
                    className="m-2"
                >
                    Insert New Person
                </Button>
                <Button
                    color="primary"
                    onClick={() => restartFn()}
                    className="m-2"
                >
                    Restart Data
                </Button>
                <Button onClick={() => loadAxios()} className="m-2">
                    Load with Axios
                </Button>
                <br></br>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>lastname</th>
                            <th>admin</th>
                            <th>email</th>
                            <th>language</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.lastname}</td>
                                <td>
                                    <Input
                                        type="checkbox"
                                        disabled={true}
                                        checked={item.admin}
                                    />
                                </td>
                                <td>
                                    <a href={`mailto:${item.email}`}>
                                        {item.email}
                                    </a>
                                </td>
                                <td>{item.language}</td>
                                <td>
                                    <Button
                                        color="warning"
                                        onClick={() => editFn(item)}
                                    >
                                        <BsFillPencilFill />
                                    </Button>{' '}
                                    <Button
                                        color="danger"
                                        onClick={() => deleteFn(item.id)}
                                    >
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <AddModal
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                setData={setData}
                data={data}
            />
            <EditModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                setData={setData}
                data={data}
                item={item}
            />

        </>
    )
}

export default App
