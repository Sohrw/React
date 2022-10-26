import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
    coinId: string;
}
interface IHistorical {
    time_open: string;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return (<div> {isLoading ? "Loading chart..." : (<ApexChart
        type="line"
        series={[
            {
                name: "Price",
                data: data?.map((price=> price.close)) as number[]
            },
        ]}
        options={{
            theme: {
                mode: isDark ? "dark" : "light",
            },
            chart: {
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background : "transparents",
            },
            grid: {
                show: false,
            },
            stroke: {
                curve: "smooth",
                width: 3,
            },
            yaxis: {
                show : false,
            },
            xaxis: {
                labels: {
                    show: false,
                    datetimeFormatter : {month: "mmm 'yy"},
                },
                axisTicks: { show: false },
                axisBorder: { show: false },
                type : "datetime",
                categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()),
                
            },
            fill: {
                type: "gradient", 
                gradient: {
                    gradientToColors: ["blue"],
                    
                },
                

            },
            colors: ["red"],
            tooltip: {
                y: {
                    formatter : (value) => `$ ${value.toFixed(3)}`,
                }
            }


        
        }} />)} </div>)
}

export default Chart;