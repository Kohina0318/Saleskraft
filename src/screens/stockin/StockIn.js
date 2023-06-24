import React, { useEffect, useState } from 'react';
import StockInModal from '../../components/Modals/StockInModal';

export default function StockIn(props) {
    const [modalVisible3, setModalVisible3] = useState(true);

    useEffect(() => {
        setModalVisible3(!modalVisible3)
    })
    return (
        <>
            <StockInModal />
        </>
    )
}