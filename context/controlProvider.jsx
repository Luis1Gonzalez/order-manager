"use Client"
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { contraseña } from "@/data/password";
import { useRouter } from "next/router";
import axios from "axios";


const ControlContext = createContext()

const ControlProvider = ({ children }) => {

    const router = useRouter();

    // Orders
    const [selectTypeProduct, setSelectTypeProduct] = useState("");
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState("")
    const [kind, setKind] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unity, setUnity] = useState("")
    const [arrayRow, setArrayRow] = useState([])
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
    const [showEntries, setShowEntries,] = useState(false)
    const [isOpenNewEntry, setIsOpenNewEntry] = useState(false)
    const [addNewEntryTitle, setAddNewEntryTitle] = useState("")
    const [addNewEntryDescription, setAddNewEntryDescription] = useState("")
    const [addNewEntryPrice, setAddNewEntryPrice] = useState("")
    const [entries, setEntries] = useState([])
    const [file, setFile] = useState(null)
    const [obtaingEntryToDelete, setObtaingEntryToDelete] = useState([])
    const [definingIdEntryDelete, setDefiningIdEntryDelete] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")



    // Generals
    const tryAccess = () => {
        const trying = contraseña.filter((filtered) => filtered.dbPhone === phoneUser);

        if (trying.length > 0) {
            setConfirmAccess(true)
            setIsOpenSignIn(false)
            router.push('/newOrder')
        } else if (trying.length === 0 || nameUser === "" || phoneUser === "") {
            setConfirmAccess(false)

            setMsg("Revisa los datos que estas ingresando, ambos son obligatorios")
            setAlert(true)

            setTimeout(() => {
                setAlert(false)
            }, 5000);
        }
    }

    // Orders
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
            }, 5000);
        } else {
            const arrayRowx = { id: uuidv4(), selectTypeProduct, kind, quantity, unity };
            setKind("");
            setQuantity("");
            setUnity("");
            setArrayRow([...arrayRow, arrayRowx])
            setAlert(false)
            setIsOpen(false)
        }
    }

    const handleRowCancelar = (e) => {
        s
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
    obtaingClients

    const newClient = async (e) => {
        e.preventDefault();

        if ([addNewClientName, addNewClientPhone].includes('')) {
            setAlert(true)
            setMsg("Ambos Campos son Obligatorios")

            setTimeout(() => {
                setAlert(false)
            }, 5000);

        } else {

            try {
                const { data } = await axios.post('/api/ourClient',
                    {
                        addNewClientName,
                        addNewClientPhone
                    })
                setSuccess(true)
                setMsg("El Cliente fue registrado")                

                setTimeout(() => {
                    setSuccess(false)
                    setShowClients(false)
                }, 3000);

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
        }, 3000);
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
            }, 5000);

        } else {
            try {
                await axios.post('api/entries',
                    {
                        addNewEntryTitle,
                        addNewEntryDescription,
                        addNewEntryPrice,
                        photoUrl
                    })
                setSuccess(true)
                setMsg("El Articulo fue publicado correctamente")
                setIsOpenNewEntry(false)

                setTimeout(() => {
                    setSuccess(false)
                    setShowEntries(false)
                }, 3000);
            } catch (error) {
                console.error(error)
            }

            setAddNewEntryTitle("")
            setAddNewEntryDescription("")
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
        }, 3000);
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
                photoUrl, setPhotoUrl
            }}
        >
            {children}
        </ControlContext.Provider>
    )
}
export { ControlProvider }
export default ControlContext