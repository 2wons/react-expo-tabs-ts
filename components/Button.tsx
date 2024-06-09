import { Button as DefaultTamaguiButton, styled, GetProps } from "tamagui";

export const Button = styled(DefaultTamaguiButton, {
    variants: {
        bold: {
            true: {
                fontWeight: "bold",
            },
            false: {
                fontWeight: "normal",
            }
        },
        off: {
            true: {
                backgroundColor: "$background075",
                color: "$color05",
                disabled: true,
            },
            false: {
                backgroundColor: "$background1",
                disabled: false,
            }
        },
        variant: {
            primary :{
                backgroundColor: "$blue9",
                color: "$white1",
            },
            destructive: {
                backgroundColor: "$red9",
                color: "$white1",
            },
            outlined: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '$borderColor',
        
                hoverStyle: {
                  backgroundColor: 'transparent',
                  borderColor: '$borderColorHover',
                },
        
                pressStyle: {
                  backgroundColor: 'transparent',
                  borderColor: '$borderColorPress',
                },
        
                focusStyle: {
                  backgroundColor: 'transparent',
                  borderColor: '$borderColorFocus',
                },
              },
        }
    } as const,
})

export type ButtonProps = GetProps<typeof Button>