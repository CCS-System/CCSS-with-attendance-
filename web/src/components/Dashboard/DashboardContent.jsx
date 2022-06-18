import { useStyletron } from 'baseui';
import React from 'react';


const DashboardContent = ({ children }) => {

    const [css] = useStyletron();

    return <div className={css({
        width: '100%',
        borderRadius: '0.5rem',
        padding: "10px",
        background: '#fff',
        minHeight: "90vh",
        border: "1px solid #DFE0EB",
        overflow: 'hidden',
        '@media (max-width: 768px)': {
            margin: '0 1.5rem'
        }
    })}>

        {children}
    </div>;
};

export default DashboardContent;
