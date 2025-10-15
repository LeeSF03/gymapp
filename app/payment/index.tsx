import { Dimensions, View } from "react-native"
import { Text } from "@/components/ui/text"
import { useSharedValue } from "react-native-reanimated"
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const data = [
  {
    id: "flex",
    name: "Flex",
    price: 29,
    billing: "mo",
    mostPopular: false,
    highlighted: false,
    features: ["Off-peak hours access", "Basic gym facilities"],
    button: {
      label: "Select Plan",
      style: "outline", // outline = bordered, text-primary
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    billing: "mo",
    mostPopular: true,
    highlighted: true, // has ring and shadow
    features: [
      "Unlimited 24/7 access",
      "All gym facilities",
      "Group fitness classes",
    ],
    button: {
      label: "Selected",
      style: "solid", // solid = bg-primary, text-background
    },
  },
  {
    id: "all-access",
    name: "All-Access",
    price: 79,
    billing: "mo",
    mostPopular: false,
    highlighted: false,
    features: ["All Pro benefits", "Personal training", "Exclusive amenities"],
    button: {
      label: "Select Plan",
      style: "outline",
    },
  },
]

const width = Dimensions.get("window").width

export default function MembershipPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }
  return (
    <View className="flex-1 items-center justify-center bg-black px-8 py-8">
      <View className="flex w-full flex-1 items-center justify-center">
        <Text variant="h2">Choose Your Plan</Text>
        <View
          id="carousel-component"
          className="mt-5 flex w-full items-center justify-center"
        >
          <Carousel
            data={data}
            loop={false}
            pagingEnabled={true}
            snapEnabled={true}
            width={width}
            height={350}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 130,
            }}
            onProgressChange={progress}
            renderItem={({
              item: { id, name, price, mostPopular, features },
            }) => (
              <View
                key={id}
                className={cn(
                  "flex h-full w-[270px] justify-center self-center rounded-xl border-2 border-gray-700 bg-secondary p-6",
                  {
                    "border-primary": selectedPlan === id,
                  }
                )}
              >
                {/* Badge */}
                {mostPopular && (
                  <View className="absolute right-4 top-0 -mt-4 rounded-full bg-primary px-3 py-1">
                    <Text className="text-xs font-bold uppercase text-background">
                      Most Popular
                    </Text>
                  </View>
                )}

                {/* Title */}
                <Text variant="h2" className="mb-2 font-bold">
                  {name}
                </Text>

                <Text className="mb-6 text-4xl font-bold">
                  {price}
                  <Text className="text-lg font-medium">/mo</Text>
                </Text>

                <View className="mb-8 flex-grow space-y-4">
                  {features.map((feature, index) => (
                    <View key={index} className="flex-row items-center">
                      <Text>{feature}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  variant={selectedPlan === id ? "default" : "outline"}
                  size="full"
                  onPress={() => setSelectedPlan(id)}
                >
                  <Text>Select Plan</Text>
                </Button>
              </View>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={data}
            dotStyle={{ backgroundColor: "#242427", borderRadius: 50 }}
            activeDotStyle={{ backgroundColor: "#ffeb00" }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        </View>
      </View>
      <Button size="full">
        <Text>Continue</Text>
      </Button>
    </View>
  )
}
