import React from "react";
import { Link } from "react-router-dom";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import {
    HeadingSmall,
    HeadingXSmall
} from 'baseui/typography';
import { Button } from "baseui/button";
export default function Header({ title, actions, sub }) {
    const overrides = { Block: { style: ({ $theme }) => ({ color: $theme.colors.primary, margin: "0px" }) } };
    return (<HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>
                {sub ? <HeadingXSmall overrides={overrides}>{title}</HeadingXSmall> : <HeadingSmall overrides={overrides}>{title}</HeadingSmall>}
            </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        {actions && actions.length && <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
                {actions.map(({ link, handler, name, kind }) => {
                    return <> {handler ? <Button
                        onClick={handler}
                        kind={kind}
                        overrides={{
                            BaseButton: {
                                style: ({ $theme }) => ({
                                    marginLeft: $theme.sizing.scale200,
                                    marginRight: $theme.sizing.scale200,

                                }),
                            },
                        }}>{name}</Button> : <Link style={{ textDecoration: 'none' }} key={link} to={link}>
                        <Button overrides={{
                            BaseButton: {
                                style: ({ $theme }) => ({
                                    marginLeft: $theme.sizing.scale200,
                                    marginRight: $theme.sizing.scale200,

                                }),
                            },
                        }}>{name}</Button>
                    </Link>}
                    </>
                })}
            </StyledNavigationItem>
        </StyledNavigationList>}
    </HeaderNavigation>)
}