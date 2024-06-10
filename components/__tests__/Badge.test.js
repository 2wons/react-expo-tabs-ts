import { render as rtlRender } from "@testing-library/react-native";
import { TamaguiProvider, Theme, createTamagui } from "tamagui";
import { config } from "@tamagui/config";
import { Badge } from "../Badge";

const tamaguiConfig = createTamagui(config)

describe('Badges', () => {
    it('renders with TamaguiProvider',() => {
        const {  getByText } = rtlRender(
            <TamaguiProvider config={tamaguiConfig}>
               <Badge label="Default" />
            </TamaguiProvider>
        )
        const badgeElement = getByText('Default')
        expect(badgeElement).toBeTruthy()
    })
})