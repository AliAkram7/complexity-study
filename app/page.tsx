import { Container, Flex, ScrollArea, Title } from "@mantine/core";
import LineChartComponentSquare2 from "../components/chart";
import BarChart from "../components/barChart";


export default async function HomePage() {



  const array_len = 40
  const x = await generateStringArrayX(array_len)
  const n2 = await generateSquaredArrayY(array_len)
  // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400]
  const log2N = await  generateLog2Array(array_len)
  // [0, 1, 1.5849625007211563, 2, 2.321928094887362, 2.584962500721156, 2.807354922057604, 3, 3.169925001442312, 3.321928094887362, 3.4594316186372978, 3.5849625007211565, 3.700439718141092, 3.807354922057604, 3.9068905956085187, 4, 4.08746284125034, 4.169925001442312, 4.247927513443585, 4.321928094887363]

  const expN = await generateExpArray(array_len)

  // [2.718281828459045, 7.3890560989306495, 20.085536923187668, 54.598150033144236, 148.4131591025766, 403.4287934927351, 1096.6331584284585, 2980.9579870417283, 8103.083927575384, 22026.465794806718, 59874.14171519782, 162754.79141900392, 442413.3920089205, 1202604.2841647768, 3269017.3724721107, 8886110.520507872, 24154952.7535753, 65659969.13733051, 178482300.96318725, 485165195.4097903]

  const nLogN = []

  for (let N = 1; N <= array_len; N++) {
    let value = N * Math.log2(N);
    nLogN.push(value);
  }

  const dataset = [
    {
      label: "O(n^2)",
      data: n2,
      borderColor: "#2B8A3E",
      backgroundColor: "#ffffff",
      pointRadius: 0
    },
    {
      label: "O(n)",
      data: x,
      borderColor: "#1864AB",
      backgroundColor: "#ffffff",
      pointRadius: 0
    },
    {
      label: "O(log2(n))",
      data: log2N,
      borderColor: "#D9480F",
      backgroundColor: "#ffffff",
      pointRadius: 0
    },
    {
      label: "O(exp(n))",
      data: expN,
      borderColor: "#862E9C",
      backgroundColor: "#ffffff",
      pointRadius: 0
    },
    {
      label: "O(n*log(n))",
      data: nLogN,
      borderColor: "#C92A2A",
      backgroundColor: "#ffffff",
      pointRadius: 0
    }



  ]



  return (
    <div style={{ width: "100%", minHeight: '100vh' }}>
      {/* <Container pt={'20px'} size={'md'}  mih={'100%'}   > */}
      <Flex direction={'column'} p={'20px'} justify={'center'} align={'center'} gap={'30px'}   >

        <Title order={1}  >
          charts below shows the different complexity time
        </ Title>

          <LineChartComponentSquare2 x={x} dataset={dataset} title="the complexity for insertion sort chart" />

          <BarChart />
      </Flex>
      {/* </Container> */}
    </div>);
}



async function generateSquaredArrayY(n: number) {
  'use server'
  const squaredArray = [];
  for (let i = 1; i <= n; i++) {
    squaredArray.push(i * i);
  }
  return squaredArray;
}

async function generateStringArrayX(n: number) {
  'use server'
  const stringArray = [];
  for (let i = 1; i <= n; i++) {
    stringArray.push(i.toString());
  }
  return stringArray;
} 

async function generateLog2Array(n: number) {
  'use server'
  const log2Array = [];
  for (let i = 1; i <= n; i++) {
    log2Array.push(Math.log2(i));
  }
  return log2Array;
}

async function generateExpArray(n: number) {
  'use server'
  const expArray = [];
  for (let i = 1; i <= n; i++) {
    expArray.push(Math.exp(i));
  }
  return expArray;
}
