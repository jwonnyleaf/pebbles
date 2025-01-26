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
  { budget: 'groceries', dollars: 500, fill: '#f7b2b7' },
  { budget: 'rent', dollars: 600, fill: '#f7717d' },
  { budget: 'utilities', dollars: 300, fill: '#de639a' },
  { budget: 'fun', dollars: 100, fill: '#5D255F' },
  { budget: 'emergency', dollars: 200, fill: '#f7b2b7' },
  { budget: 'food', dollars: 150, fill: '#f7717d' },
  { budget: 'personal', dollars: 100, fill: '#de639a' }
];

const incomeData = [
  { total: 'pay', dollars: 300, fill: '#5D255F' },
  { total: 'grants', dollars: 100, fill: '#f7717d' },
];

const chartConfig: ChartConfig = {
  dollars: {
    label: 'dollars',
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
  emergency: {
    label: 'emergency',
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
  food: {
    label: 'food',
  },
  personal: {
    label: 'personal ',
  },
} satisfies ChartConfig;

const Budget = () => {
  return (
    <div className="h-full w-full bg-lightgreen grid grid-cols-3 gap-7 p-8">
      <div className="col-span-1 flex flex-col gap-8">
        {/* Monthly Spending Card */}
        <Card className="flex flex-col bg-white rounded-3xl p-8">
          <CardHeader className="items-center pb-0 text-green">
            <CardTitle className="text-xl text-center">
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
                  dataKey="dollars"
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
            <CardTitle className="text-xl text-center">
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
                <XAxis dataKey="dollars" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="dollars" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 h-full bg-lightgreen flex items-center justify-center">
        <Card className="w-full bg-white rounded-3xl p-8 h-full">
          <CardHeader className="items-center pb-0 text-green">
            <CardTitle className="text-xl text-center">
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
                  left: 50,
                }}
                barCategoryGap="50%" 
                barGap= {20}
              >
                <YAxis
                  className="text-green"
                  dataKey="budget"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <XAxis dataKey="dollars" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="dollars" layout="vertical" radius={5} barSize= {45} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
