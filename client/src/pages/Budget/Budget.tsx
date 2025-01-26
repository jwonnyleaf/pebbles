import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { budget: "groceries", pebbles: 500, fill: "purple" },
  { budget: "rent", pebbles: 600, fill: "pink" },
  { budget: "utilities", pebbles: 300, fill: "silver" },
  { budget: "fun", pebbles: 100, fill: "salmon" },
]

const chartConfig: ChartConfig = {
  pebbles: {
    label: "pebbles",
  },
  groceries: {
    label: "groceries",
  },
  rent: {
    label: "rent",
  },
  utilities: {
    label: "utilities",
  },
  fun: {
    label: "fun",
  },
} satisfies ChartConfig

const Budget = () => {
  return (
    <div className="h-screen w-screen bg-lightgreen p-7">
      <Card className="flex flex-col bg-white rounded-3xl -8">
        <CardHeader className="items-center pb-0 text-green">
          <CardTitle className = "text-lg"><b>Monthly Spending</b><p>---------------------------------</p></CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 text-green">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="pebbles"
                nameKey="budget"
                innerRadius={45}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default Budget;