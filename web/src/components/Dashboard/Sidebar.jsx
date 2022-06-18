import React from 'react'

import { styled, useStyletron } from 'baseui';

import logo from '../../logo.jpg'
import SideNavListItem from './SideNavListItem';



const Sidebar = ({ open, setOpen, menuData }) => {

    const [css, theme] = useStyletron();

    const SidebarWrapper = styled('section', {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        maxWidth: '300px',
        height: '100vh',
        background: 'white',

        overflowX: 'hidden',
    });

    const Logo = styled('div', {
        padding: '1rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        textAlign: "center",
        color: theme.colors.primary600,
        fontWeight: 'bold',
        boxSizing: 'border-box',
        background: 'none',
        margin: "1rem 1rem",
        borderBottom: `solid ${theme.colors.primary400} .1rem`,
    })

    return (
        <SidebarWrapper className={css({
            '@media (max-width: 768px)': {
                display: open ? 'block' : 'none',
            }
        })}>
            <div className={css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                background: 'white',
                opacity: "0.5",
                height: '100vh',
                zIndex: '-1',
                display: 'none',

                '@media (max-width: 768px)': {
                    display: open ? 'block' : 'none',
                }
            })}
                onClick={() => setOpen(false)}
            />
            <Logo>
                <img className={css({
                    width: '8.5rem',
                    height: '7rem',
                    marginRight: '0.5rem',
                })} src={logo} alt="logo" />

            </Logo>

            {
                menuData.map(({ icon, title, active, to }) => (
                    <SideNavListItem key={to} active={active} to={to} title={title}>
                        {icon}
                    </SideNavListItem>
                ))
            }
        </SidebarWrapper>
    )
}

export default Sidebar