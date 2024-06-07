import { SizableText, View, styled, GetProps, FontSizeTokens, ButtonProps, XStack } from "tamagui";

export const BadgeView = styled(View, {
  name: "Badge",
  borderRadius: "$3",
  padding: "$1.5",
  borderWidth: "$1",

  variants: {
    variant: {
      default:{
        backgroundColor: "$background",
        borderColor: "$gray5",
      },
      success: {
        backgroundColor: "$green6",
        borderColor: "$green8",
      },
      danger: {
        backgroundColor: "$red6",
        borderColor: "$red8",
      },
    }
  }
})

type BadgeViewProps = GetProps<typeof BadgeView>

interface BadgeProps extends BadgeViewProps {
  label?: string
  labelSize?: FontSizeTokens
  icon?: JSX.Element
}

export const Badge = ({ label, labelSize, icon, ...otherProps }: BadgeProps) => {
  return (
    <BadgeView {...otherProps}>
      <XStack gap="$2" alignItems="center">
      { icon && icon }
      <SizableText marginHorizontal="$1.5" size={labelSize ?? '$2'} color="$white">
        { label }
      </SizableText>
      </XStack>
    </BadgeView>
  )
};
