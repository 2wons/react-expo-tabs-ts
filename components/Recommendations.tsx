import { View } from "./Themed"
import { Paragraph, SizableText, Text, YStack } from "tamagui"
import { HEALTHY, INITIAL, MODERATE, EXTENSIVE, CariesClass } from "@/constants/Common"
import { ClassCounts } from "./ResultView";

type RecommendationFetcherProps = {
  type: string
  counts: ClassCounts
};

type RecommendationProps = {
  count: number
}

export const Recommendations = ({ type, counts }: RecommendationFetcherProps) => {
  switch (type) {
    case HEALTHY:
      return <HealthyRecommendation count={counts.healthy ?? 0} />
    case INITIAL:
      return <InitialRecommendation count={counts.initial ?? 0} />
    case MODERATE:
      return <ModerateRecommendation count={counts.moderate ?? 0} />
    case EXTENSIVE:
      return <ExtensiveRecommendation count={counts.extensive ?? 0} />
    default:
      return (
        <Paragraph>
          {`No teeth detected. Make sure to capture your teeth properly. For a more precise analysis, it is recommended that the image is focused on your mouth with good lighting and make sure your teeth are not too wet.`}
        </Paragraph>
      )
  }
}

const HealthyRecommendation = (props: RecommendationProps) => {
  return (
    <>
    <Paragraph fontWeight={700}>
      {`You have healthy teeth! It is recommended that you maintain good oral hygiene`}
    </Paragraph>
    <YStack>
      <Paragraph>
        {`a. Brush teeth twice a day with fluoride toothpaste.`}
      </Paragraph>
      <Paragraph>
        {`b. Floss daily to remove plaque between teeth.`}
      </Paragraph>  
      <Paragraph>
        {`c. Regular dental check-ups and cleanings every 6 months.`}
      </Paragraph>
      <Paragraph>
        {`d. Maintain a balanced diet low in sugary snacks and drinks.`} 
      </Paragraph>
    </YStack>
    </>
  )
}

const InitialRecommendation = (props: RecommendationProps) => {
  return (
    <>
    <Paragraph>
      {`You have ${props.count} initial stage caries. It is recommended that you do the following:`}
    </Paragraph>
    <YStack>
      <Paragraph fontWeight={700} marginTop="$2">
        {`1. Maintain Oral Hygiene:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Continue brushing twice a day with fluoride toothpaste.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. Floss daily to remove plaque and prevent further decay.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`2. Fluoride Use:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Use fluoride mouthwash to help remineralize enamel.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. Consider professional fluoride treatments at the dentist's office.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`3. Dietary Advice:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Reduce the intake of sugary and acidic foods and beverages.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. Increase intake of water and foods rich in calcium and phosphates.`}
      </Paragraph>

    </YStack>
    </>
  )
}

const ModerateRecommendation = (props: RecommendationProps) => {
  return (
    <>
    <Paragraph>
      {`You have ${props.count} moderate stage caries. It is recommended that you do the following:`}
    </Paragraph>
    <YStack>
      <Paragraph fontWeight={700} marginTop="$2">
        {`1. Consult Your Dentist:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Schedule an appointment for a thorough dental examination.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. The dentist may perform a professional cleaning and possibly sealants to protect teeth.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`2. Restorative Treatment:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Fillings may be necessary to restore the affected areas and prevent further decay.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. The dentist might also use fluoride varnish or other remineralizing agents.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`3. Oral Hygiene and Diet:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Maintain rigorous oral hygiene practices.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. Follow dietary recommendations to minimize sugar and acid exposure.`}
      </Paragraph>
    </YStack>
    </>
  )
}

const ExtensiveRecommendation = (props: RecommendationProps) => {
  return (
    <>
    <Paragraph>
      {`You have ${props.count} extensive stage caries. It is recommended that you do the following:`}
    </Paragraph>
    <YStack>
      <Paragraph fontWeight={700} marginTop="$2">
        {`1. Seek Immediate Dental Treatment:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Schedule an appointment for urgent dental care to prevent infection and further damage.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. The dentist will likely need to perform more extensive restorative work, such as fillings, crowns, or possibly root canal therapy if the pulp is involved.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`2. Preventive Measures Post-Treatment:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Follow all post-treatment care instructions provided by the dentist.`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`b. Consider additional preventive measures, such as fluoride treatments or dental sealants, to protect other teeth.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`3. Maintain Oral Hygiene:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Continue rigorous oral hygiene practices and regular dental visits to monitor and maintain dental health.`}
      </Paragraph>
      <Paragraph fontWeight={700} marginTop="$2">
        {`4. Dietary Advice:`}
      </Paragraph>
      <Paragraph marginLeft="$3">
        {`a. Follow a diet that supports dental health, emphasizing low sugar and high nutrient foods.`}
      </Paragraph> 
    </YStack>
    </>
  )
}

