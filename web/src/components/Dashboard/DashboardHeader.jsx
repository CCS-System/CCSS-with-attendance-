import React from 'react'

import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { OptionProfile } from 'baseui/menu';
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { useStyletron } from 'baseui';
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import Menu from 'baseui/icon/menu'
import useAuth from "../../hooks/useAuth";
import { Avatar } from "baseui/avatar"

const DashboardHeader = ({ open, setOpen, title }) => {
    const { metadata: { email, fullname, studentId, advisorId, companyName, profilePicture, role }, logout } = useAuth();
    const [css, theme] = useStyletron();


    return (
        <HeaderNavigation className={css({
            width: '100%',
            borderBottom: 'none !important',

            '@media (max-width: 768px)': {
                paddingLeft: '0',
            }
        })}>
            <NavigationList $align={ALIGN.left}>
                <NavigationItem className={css({
                    fontSize: '1.5rem',
                })}>
                    <div className={css({
                        display: 'none',
                        '@media (max-width: 768px)': {
                            display: 'block',
                        }
                    })}>
                        <Menu
                            size='2rem'
                            className={css({ background: theme.colors.primary100, padding: ".4rem", borderRadius: "10%" })}
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                    <span className={css({
                        display: 'block',
                        color: theme.colors.primary,
                        '@media (max-width: 768px)': {
                            display: 'none',
                        }
                    })}>
                        {title || "Page"}
                    </span>
                </NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.center} />
            <NavigationList $align={ALIGN.right}>
                <NavigationItem>
                    <StatefulPopover
                        placement={PLACEMENT.bottom}
                        showArrow
                        content={() => (
                            <Block width="250px">
                                {/* <OptionProfile
                                    overrides={{ ListItemProfile: { style: () => ({ ":hover": { backgroundColor: "transparent" } }) } }}
                                    item={{ fullname, profilePicture, email, companyName, advisorId, studentId, role }}
                                    getProfileItemLabels={({ fullname, email, companyName, advisorId, studentId, role }) => ({
                                        title: fullname,
                                        subtitle: email,
                                        body: studentId || companyName || advisorId || role
                                    })}

                                    getProfileItemImg={item => item.profilePicture || "https://via.placeholder.com/60x60"}
                                    getProfileItemImgText={item => item.fullname}

                                /> */}
                                <Button size="compact" kind="tertiary" overrides={{ BaseButton: { style: () => ({ width: "100%" }) } }} onClick={logout}>Logout</Button>

                            </Block>
                        )}
                    >
                        <Button overrides={{ BaseButton: { style: () => ({ backgroundColor: "transparent", paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px", paddingBottom: "0px", ":hover": { backgroundColor: "transparent" } }) } }}>

                            {/* <Avatar
                                name={fullname}
                                size="scale1600"
                                src={profilePicture} /> */}

                            <OptionProfile
                                item={{ fullname, profilePicture, email, companyName, advisorId, studentId, role }}
                                getProfileItemLabels={({ fullname, email, companyName, advisorId, studentId, role }) => ({
                                    title: fullname,
                                    subtitle: email,
                                    body: studentId || companyName || advisorId || role
                                })}

                                getProfileItemImg={item => item.profilePicture || "https://via.placeholder.com/60x60"}
                                getProfileItemImgText={item => item.fullname}

                            />
                        </Button>
                    </StatefulPopover>
                </NavigationItem>
            </NavigationList>
        </HeaderNavigation>
    )
}

export default DashboardHeader
