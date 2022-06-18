import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from 'baseui/icon/arrow-right';
import { Button } from "baseui/button";
import { Card, StyledBody, StyledAction } from 'baseui/card';

import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

const itemProps = {
    height: 'scale1000',
    display: 'flex',

};

const Page = ({ department, sections, path }) => {
    const navigate = useNavigate();
    return <>
        <Card
            title={department}
        >
            <StyledBody>
                <FlexGrid
                    flexGridColumnCount={2}
                    flexGridColumnGap="5px"
                    flexGridRowGap="5px"
                >
                    {sections.map(({ id, label }) => (<FlexGridItem key={id} {...itemProps} ><Button startEnhancer={() => <ArrowRight size={24} />} kind="tertiary" onClick={() => { navigate(`/app/admin/${path || "section"}/${id}`) }}>{label}</Button></FlexGridItem>))}
                </FlexGrid>
            </StyledBody>

        </Card>
    </>


}
export default Page;