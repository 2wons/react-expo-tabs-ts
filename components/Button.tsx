import { Button as DefaultTamaguiButton, styled } from "tamagui";

export const Button = styled(DefaultTamaguiButton, {
    variants: {
        disableed: {
            true: {
                backgroundColor: "$background075",
                color: "$color05",
                disabled: true,
            },
            false: {
                backgroundColor: "$background1",
                color: "$color12",
                disabled: false,
            }
            
        },
    },
})