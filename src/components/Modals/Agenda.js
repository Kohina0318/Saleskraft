import React, { useEffect, useState } from 'react';
import AgendaModal from '../Modals/AjendaModal';

export default function Agenda(props) {
    const [modalVisible2, setModalVisible2] = useState(true);

    useEffect(() => {
        setModalVisible2(!modalVisible2)
    })
    return (
        <>
            {modalVisible2 ? (
                <AgendaModal
                    modalVisible2={modalVisible2}
                    setmodalVisible2={setModalVisible2}
                />
            ) : (
                <></>
            )}
        </>
    )
}