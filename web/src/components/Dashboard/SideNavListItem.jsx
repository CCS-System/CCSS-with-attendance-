import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import { styled, useStyletron } from 'baseui';

const SideNavListItem = ({ title, children, to }) => {
    const location = useLocation();
    const [css, theme] = useStyletron();
    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <StyledMenuItem $active={location.pathname === to} title={title} theme={theme}>
                {children}
                {title}
            </StyledMenuItem>
        </Link>
    )
}

export default SideNavListItem

const StyledMenuItem = styled('div', props => ({
    padding: '1rem 2rem',
    background: props.$active ? props.theme.colors.primary100 : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '1rem',
    color: props.$active ? props.theme.colors.primary700 : props.theme.colors.primary600,
    cursor: 'pointer',
    borderLeft: props.$active ? '4px solid #DDE2FF' : 'none',

    ':hover': {
        background: props.theme.colors.primary100,
        color: props.theme.colors.primary600,
        borderLeft: '4px solid #DDE2FF',
    }
}))