import React from 'react'
import { styled } from 'baseui';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const Dashboard = ({ children, title, menu }) => {

    const [open, setOpen] = React.useState(false);
    return (
        <DashboardWrapper>
            <Sidebar open={open} setOpen={setOpen} menuData={menu} />
            <DashboardHeader open={open} setOpen={setOpen} title={title} />
            <DashboardContent >
                {children}
            </DashboardContent>
        </DashboardWrapper>
    )
}

export default Dashboard

const DashboardWrapper = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    paddingLeft: '320px',
    paddingRight: '2rem',
    width: '100%',
    minHeight: '100vh',
    maxWidth: '100vw',
    boxSizing: 'border-box',

    '@media (max-width: 768px)': {
        paddingLeft: '0',
    }
});