import React from "react";
import { useStyletron } from 'baseui';
import Login from "../components/Login";
import banner from "../illustrations/illustration-6.svg";
import { Block } from "baseui/block";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
const itemProps = {
    display: 'flex',

};
const Page = () => {
    const [css, theme] = useStyletron();
    const { login: { request, loading } } = useAuth();
    return (
        <FlexGrid
            flexGridColumnCount={[1, 1, 2, 2]}
            flexGridColumnGap="10px"
            flexGridRowGap="10px"
            margin="10px"
        >
            <FlexGridItem  {...itemProps} >
                <Block width="100%" margin="auto">
                    <img className={css({
                        width: '100%',
                    })} src={banner} alt="logo" />


                </Block>

            </FlexGridItem>
            <FlexGridItem {...itemProps} >
                <Block width="90%" margin="auto">

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
                        Login to your account
                    </h2>
                    <Login onSubmit={request} isLoading={loading} />
                    {/* <p>Don't have an account? <Link to="/signup" >Signup</Link></p> */}
                </Block>


            </FlexGridItem>
        </FlexGrid>)
}
export default Page;