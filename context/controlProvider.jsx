
"use Client"
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import axios from "axios";


const ControlContext = createContext()

const ControlProvider = ({ children }) => {

    const router = useRouter();

    // General
    const [alert, setAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState("")
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [isOpenSignIn, setIsOpenSignIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Clients
    const [nameUser, setNameUser] = useState("")
    const [phoneUser, setPhoneUser] = useState("")
    const [confirmAccess, setConfirmAccess] = useState(false)
    const [ourClients, setOurClients] = useState([])
    const [isOpenNewClient, setIsOpenNewClient] = useState(false)
    const [addNewClientName, setAddNewClientName] = useState("")
    const [addNewClientPhone, setAddNewClientPhone] = useState("")
    const [showClients, setShowClients] = useState(false)
    const [obtaingClientToDelete, setObtaingClientToDelete] = useState([])
    const [definingPhoneDelete, setDefiningPhoneDelete] = useState("")

    // Entries
    const [showEntries, setShowEntries] = useState(false)
    const [isOpenNewEntry, setIsOpenNewEntry] = useState(false)
    const [addNewEntryTitle, setAddNewEntryTitle] = useState("")
    const [addNewEntryDescription, setAddNewEntryDescription] = useState("")
    const [addNewEntryDescription2, setAddNewEntryDescription2] = useState("")
    const [addNewEntryPrice, setAddNewEntryPrice] = useState("")
    const [entries, setEntries] = useState([])
    const [file, setFile] = useState(null)
    const [obtaingEntryToDelete, setObtaingEntryToDelete] = useState([])
    const [definingIdEntryDelete, setDefiningIdEntryDelete] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")

    // Orders
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [showOrders, setShowOrders] = useState(false)
    const [selectTypeProduct, setSelectTypeProduct] = useState("");
    const [kind, setKind] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unity, setUnity] = useState("")
    const [comment, setComment] = useState("")
    const [arrayRow, setArrayRow] = useState([])
    const [userUsingNow, setUserUsingNow] = useState({})
    const [creationHour, setCreationHour] = useState("");
    const [creationDay, setCreationDay] = useState("");
    const [creationTime, setCreationTime] = useState("")
    const [status, setStatus] = useState(false)
    const [orders, setOrders] = useState([])
    const [statusOrder, setStatusOrder] = useState(false);
    const [selectShowOrder, setSelectShowOrder] = useState([])
    const [showOrdersDetails, setShowOrdersDetails] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [allDetailsOrders, setAllDetailsOrders] = useState([])
    const [newAllDetailsOrders, setNewAllDetailsOrders] = useState([])
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [isConfirmFinishOrder, setIsConfirmFinishOrder] = useState(false)
    const [closedTime, setClosedTime] = useState(null)
    const [isOpenConfirmCancelOrder, setIsOpenConfirmCancelOrder] = useState(false)
    const [idClosingOrder, setIdClosingOrder] = useState("")
    const [closedShowOrderx, setCloseShowOrderx] = useState([]);
    const [idDeletingOrders, setIdDeletingOrders] = useState(null);
    const [isOpenTicket, setIsOpenTicket] = useState(false);
    const [seeTicket, setSeeTicket] = useState(false);




    // Generals
    const tryAccess = () => {
        const trying = ourClients.filter((filtered) => filtered.phone === phoneUser);
        setIsLoading(true)

        if (trying.length > 0 && nameUser !== "") {
            setUserUsingNow(trying[0].name)
            setConfirmAccess(true)
            setIsOpenSignIn(false)
            router.push('/newOrder')
            setIsLoading(false)
        } else if (trying.length === 0 || nameUser === "" || phoneUser === "") {
            setConfirmAccess(false)

            setMsg("Revisa los datos que estas ingresando, ambos son obligatorios")
            setAlert(true)
            setIsLoading(false)
            setTimeout(() => {
                setAlert(false)
            }, 2000);
        }
    }

    const orderTime = () => {
        const normalTime = new Date();
        const time = Date.now()
        const now = normalTime.toLocaleTimeString();
        const date = normalTime.toLocaleDateString();
        setCreationTime(time)
        setCreationHour(now)
        setCreationDay(date)
    }


    // Clients
    useEffect(() => {
        const obtaingClients = async () => {
            try {
                const { data } = await axios('api/ourClient')
                setOurClients(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtaingClients()
    }, [])

    const obtaingClients = async () => {
        try {
            const { data } = await axios('api/ourClient')
            setOurClients(data)
        } catch (error) {
            console.log(error)
        }
    }


    const newClient = async (e) => {
        e.preventDefault();

        if ([addNewClientName, addNewClientPhone].includes('')) {
            setAlert(true)
            setMsg("Ambos Campos son Obligatorios")

            setTimeout(() => {
                setAlert(false)
            }, 2000);

        } else {

            try {
                await axios.post('/api/ourClient',
                    {
                        addNewClientName,
                        addNewClientPhone
                    })
                setSuccess(true)
                setMsg("El Cliente fue registrado")

                setTimeout(() => {
                    setSuccess(false)
                    setShowClients(false)
                }, 2000);

            } catch (error) {
                console.log(error)
            }

            setAddNewClientName("")
            setAddNewClientPhone("")
            setIsOpenNewClient(false)

        }
    }

    const deletingClient = async () => {
        try {
            await axios.delete(`/api/deleteClient/${definingPhoneDelete}`);
        } catch (error) {
            console.log(error)
        }
    }

    const closeDelete = () => {
        setSuccess(true)
        setMsg("El Cliente fue Eliminado Correctamente")

        setTimeout(() => {
            setSuccess(false)
            setShowClients(false)
        }, 2000);
    }

    // Entries

    // Obteniendo entradas

    const obtainEntries = async () => {
        try {
            const { data } = await axios('api/entries')
            setEntries(data)
        } catch (error) {
            console.log(error)
        }
    }

    // Creando Entradas
    const newEntry = async (e) => {
        e.preventDefault();

        if ([addNewEntryTitle, addNewEntryDescription].includes('')) {
            setAlert(true)
            setMsg("Todos los Campos son Obligatorios")

            setTimeout(() => {
                setAlert(false)
            }, 2000);

        } else {
            try {
                await axios.post('api/entries',
                    {
                        addNewEntryTitle,
                        addNewEntryDescription,
                        addNewEntryDescription2,
                        addNewEntryPrice,
                        photoUrl
                    })
                setSuccess(true)
                setMsg("El Articulo fue publicado correctamente")
                setIsOpenNewEntry(false)

                setTimeout(() => {
                    setSuccess(false)
                    setShowEntries(false)
                }, 2000);
            } catch (error) {
                console.error(error)
            }

            setAddNewEntryTitle("")
            setAddNewEntryDescription("")
            setAddNewEntryDescription2("")
            setAddNewEntryPrice("")
            setIsOpenNewEntry(false)
            setPhotoUrl("")
        }
    }

    const deletingEntry = async () => {
        try {
            await axios.delete(`/api/deleteEntry/${definingIdEntryDelete}`);

        } catch (error) {
            console.log(error)
        }
    }

    const closeDeleteEntry = () => {
        setSuccess(true)
        setMsg("El Articulo fue Eliminado Correctamente")

        setTimeout(() => {
            setSuccess(false)
            setShowEntries(false)
        }, 2000);
    }


    // Orders

    const obtaingOrders = async () => {
        try {
            const { data } = await axios('api/order')
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const optionSelect = () => {
            switch (selectTypeProduct) {
                case 'cerdo':
                    let cerdo = ['Chuleta', 'Manitas', 'Morros'];
                    setOptions(cerdo)
                    break;
                case 'pollo':
                    let pollo = ['Pechuga', 'Alitas', 'Muslos'];
                    setOptions(pollo)
                    break;
                case 'ternera':
                    let ternera = ['Bisteak', 'Chuleton', 'Entraña'];
                    setOptions(ternera)
                    break;
                case 'cordero':
                    let cordero = ['medallones', 'paletilla', 'costillas'];
                    setOptions(cordero)
                    break;
                case 'embut':
                    let embutidos = ['Chorizos', 'Longanizas', 'Morzillas', 'Madeja'];
                    setOptions(embutidos)
                    break;
            }
        }
        optionSelect()
    }, [selectTypeProduct])

    const handleRowMore = (e) => {
        e.preventDefault();
        if (kind === "" || quantity === "" || unity === "") {

            setMsg("Todos los Campos son Necesarios")
            setAlert(true)

            setTimeout(() => {
                setAlert(false)
            }, 2000);
        } else {
            const arrayRowx = { id: uuidv4(), selectTypeProduct, kind, quantity, unity };
            orderTime()
            setKind("");
            setQuantity("");
            setUnity("");
            setArrayRow([...arrayRow, arrayRowx])
            setAlert(false)
            setIsOpen(false)
        }
    }

    const handleRowCancelar = (e) => {
        e.preventDefault()
        setIsOpen(false)
        setAlert(false)
        setKind("");
        setQuantity("");
        setUnity("");
    }

    const deleteProduct = (id) => {
        const deletingProduct = arrayRow.filter(filtered => filtered.id !== id)
        setArrayRow(deletingProduct)
    }

    // Creando Pedidos
    const newOrder = async (e) => {
        e.preventDefault();
        try {
            await axios.post('api/order',
                {
                    arrayRow,
                    userUsingNow,
                    nameUser,
                    phoneUser,
                    comment,
                    creationHour,
                    creationDay,
                    creationTime,
                    status
                })

            setArrayRow([])
            setUserUsingNow("")
            setNameUser("")
            setComment("")
            // router.push("/")
            setPhoneUser("")
            setIsOpenTicket(true)

        } catch (error) {
            console.error(error)
        }
    }

    const sendIdOrderDetails = async (id) => {
        const verified = orders.filter(filtered => filtered.id === id)
        setAllDetailsOrders(verified[0])
        setShowOrdersDetails(true)
        setShowOrders(false)
    }

    const changeStatusRow = (id) => {
        if (disabledButtons.includes(id)) {
            setDisabledButtons(disabledButtons.filter(buttonId => buttonId !== id))
        } else {
            setDisabledButtons([...disabledButtons, id]);
        }
    };

    const handleStatusOrder = (id) => {
        setIdClosingOrder(id)
        setIsConfirmFinishOrder(true)
        let time = Date.now()
        setClosedTime(time);
    }

    const closingOrder = async () => {
        const response = await fetch('/api/order', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: idClosingOrder,
                status: status,
                closedTime, closedTime
            })
        })
        const updateData = await response.json();
        setSelectShowOrder(updateData)
        obtaingOrders()
        setOrders([])
        setShowOrdersDetails(false)
        setStatus(false)
        setIsConfirmFinishOrder(false)
        setClosedTime(null)
        setShowOrders(true)
    }

    const deletingOrders = async () => {

        try {
            await axios.delete('/api/deleteOrders/deleteOrders');
        } catch (error) {
            console.error('Error al eliminar registros:', error);
            throw error;
        };

    }


    return (
        <ControlContext.Provider
            value={{
                selectTypeProduct, setSelectTypeProduct,
                options, setOptions,
                isOpen, setIsOpen,
                alert, setAlert,
                success, setSuccess,
                msg, setMsg,
                kind, setKind,
                quantity, setQuantity,
                unity, setUnity,
                handleRowMore,
                arrayRow, setArrayRow,
                handleRowCancelar,
                isOpenConfirm, setIsOpenConfirm,
                deleteProduct,
                isOpenSignIn, setIsOpenSignIn,
                nameUser, setNameUser,
                phoneUser, setPhoneUser,
                tryAccess,
                obtaingClients,
                ourClients, setOurClients,
                isOpenNewClient, setIsOpenNewClient,
                addNewClientName, setAddNewClientName,
                addNewClientPhone, setAddNewClientPhone,
                newClient,
                showClients, setShowClients,
                success, setSuccess,
                obtaingClientToDelete, setObtaingClientToDelete,
                definingPhoneDelete, setDefiningPhoneDelete,
                deletingClient,
                closeDelete,
                showEntries, setShowEntries,
                isOpenNewEntry, setIsOpenNewEntry,
                addNewEntryTitle, setAddNewEntryTitle,
                addNewEntryDescription, setAddNewEntryDescription,
                addNewEntryDescription2, setAddNewEntryDescription2,
                addNewEntryPrice, setAddNewEntryPrice,
                newEntry,
                obtainEntries,
                entries, setEntries,
                file, setFile,
                obtaingEntryToDelete, setObtaingEntryToDelete,
                deletingEntry,
                definingIdEntryDelete, setDefiningIdEntryDelete,
                closeDeleteEntry,
                isLoading, setIsLoading,
                photoUrl, setPhotoUrl,
                showOrders, setShowOrders,
                comment, setComment,
                newOrder,
                userUsingNow,
                creationHour, setCreationHour,
                creationDay, setCreationDay,
                orderTime,
                obtaingOrders,
                isOpenTicket, setIsOpenTicket,
                orders, setOrders,
                status, setStatus,
                statusOrder, setStatusOrder,
                selectShowOrder, setSelectShowOrder,
                showOrdersDetails, setShowOrdersDetails,
                sendIdOrderDetails,
                orderDetails, setOrderDetails,
                allDetailsOrders, setAllDetailsOrders,
                newAllDetailsOrders, setNewAllDetailsOrders,
                changeStatusRow,
                disabledButtons,
                handleStatusOrder,
                closingOrder,
                isOpenConfirmCancelOrder, setIsOpenConfirmCancelOrder,
                isConfirmFinishOrder, setIsConfirmFinishOrder,
                closedTime, setClosedTime,
                closedShowOrderx, setCloseShowOrderx,
                idDeletingOrders, setIdDeletingOrders,
                deletingOrders,
                seeTicket, setSeeTicket
            }}
        >
            {children}
        </ControlContext.Provider>
    )
}
export { ControlProvider }
export default ControlContext