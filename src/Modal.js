import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%',
    overflowY: 'auto',
    overflowX:'hidden'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
}

export default function Modal({ children, onClose }) {

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <div style={{ position: 'relative',marginBottom:'4rem' }}>
                    <button className='btn fs-3' style={{ position: 'absolute', right:3 }} onClick={onClose}> X </button>
                </div>
                {children}

            </div>
        </>,
        document.getElementById('cart-root')
    )
}