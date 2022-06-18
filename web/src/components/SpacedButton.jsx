import { Button, KIND, SIZE, SHAPE } from "baseui/button";
export default function SpacedButton(props) {
    return (
        <Button
            {...props}
            shape={SHAPE.pill}
            kind={KIND.secondary}
            size={SIZE.compact}
            overrides={{
                BaseButton: {
                    style: ({ $theme }) => ({
                        marginLeft: $theme.sizing.scale200,
                        marginRight: $theme.sizing.scale200,
                        marginTop: $theme.sizing.scale800,
                    }),
                },
            }}
        />
    );
}