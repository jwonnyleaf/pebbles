import { Pie, PieChart } from 'recharts';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const pieData = [
  { budget: 'groceries', pebbles: 500, fill: 'purple' },
  { budget: 'rent', pebbles: 600, fill: 'pink' },
  { budget: 'utilities', pebbles: 300, fill: 'silver' },
  { budget: 'fun', pebbles: 100, fill: 'salmon' },
];

const incomeData = [
  { total: 'beg', pebbles: 300, fill: 'purple' },
  { total: 'crime', pebbles: 100, fill: 'salmon' },
];

const chartConfig: ChartConfig = {
  pebbles: {
    label: 'pebbles',
  },
  groceries: {
    label: 'groceries',
  },
  rent: {
    label: 'rent',
  },
  utilities: {
    label: 'utilities',
  },
  fun: {
    label: 'fun',
  },
  beg: {
    label: 'beg',
  },
  crime: {
    label: 'crime',
  },
} satisfies ChartConfig;

const Budget = () => {
  return (
    <div className="h-full w-full bg-lightgreen grid grid-cols-3 gap-7 p-8">
      <div className="col-span-1 flex flex-col gap-8">
        {/* Monthly Spending Card */}
        <Card className="flex flex-col bg-white rounded-3xl p-8">
          <CardHeader className="items-center pb-0 text-green">
            <CardTitle className="text-xl">
              <b>Monthly Spending</b>
              <p>------------------------------</p>
            </CardTitle>
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
                  data={pieData}
                  dataKey="pebbles"
                  nameKey="budget"
                  innerRadius={45}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* Income Card */}
        <Card className="flex flex-col bg-white rounded-3xl p-8 text-green">
          <CardHeader className="items-center pb-0 text-green">
            <CardTitle className="text-xl">
              <b>Income</b>
              <p>------------------------------</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={incomeData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  className="text-green"
                  dataKey="total"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey="pebbles" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="pebbles" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 h-full bg-lightgreen flex items-center justify-center">
        <Card className="w-full bg-white rounded-3xl p-8 h-full">
          <CardHeader className="items-center pb-0 text-green">
            <CardTitle className="text-xl">
              <b>Expenses</b>
              <p>------------------------------</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={pieData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  className="text-green"
                  dataKey="budget"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey="pebbles" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="pebbles" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
