import {getWeatherBundle} from "@/lib/weather"
import Dashboard from '@/app/dashboard/Dashboard';
export default async function Page(){
  const data = await getWeatherBundle()
  return <Dashboard data={data} />
}