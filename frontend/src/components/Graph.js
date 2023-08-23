import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { format } from 'date-fns';

const Graph = ({ data }) => {
  return (

    <ResponsiveContainer height={450} width={425}>
      <LineChart data={data} >
        <XAxis dataKey="createdAt"  axisLine={false} tickCount={7} tick={{stroke: "orange"}} tickLine={false} tickFormatter={str => {
          const date = new Date(str);
          return format(date, "MMM, d");
        }} />
        <YAxis axisLine={false} tickLine={false} tick={{stroke: "orange"}} />
        <CartesianGrid opacity={0.1} vertical={false} />
        <Tooltip />
        <Line name="Hours of Sleep" type="monotone" dataKey="sleep" stroke="#ff0000" />
        <Line name="Calories(kCal)" type="monotone" dataKey="calories" stroke="#00ff6e" />
        <Line name="Happiness Level" type="monotone" dataKey="happiness" stroke="#00e4fd" />
      </LineChart>
      
    </ResponsiveContainer>
  )
}

export default Graph