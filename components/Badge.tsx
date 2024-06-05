import { SizableText, View, styled, GetProps } from "tamagui";

export const BadgeView = styled(View, {
  name: "Badge",
  borderRadius: "$3",
  padding: "$1.5",
  borderWidth: "$1",

  variants: {
    variant: {
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
}

export const Badge = ({ label, ...otherProps }: BadgeProps) => {
  return (
    <BadgeView {...otherProps}>
      <SizableText size="$2" color="$white">
        { label }
      </SizableText>
    </BadgeView>
  )
};
