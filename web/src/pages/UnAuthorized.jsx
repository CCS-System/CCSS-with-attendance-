import React from "react";
import { useStyletron } from 'baseui';
import banner from "../banner.svg";
import { Link } from "react-router-dom";
import { Block } from "baseui/block";
const Page = () => {
    const [css, theme] = useStyletron();
    return (
        <Block width={["100%", "100%", "50%", "30%"]} margin="auto">
            <img className={css({
                width: '100%',
            })} src={banner} alt="logo" />
            <h2
                className={css({
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    color: theme.colors.primary600,
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: "32px",
                    lineHeight: "48px"
                })}
            >
                You are not authorized to access this resource!
            </h2>
            <Link to="/" className={css({ marginLeft: "50%" })}>Home</Link>
        </Block>)
}
export default Page;