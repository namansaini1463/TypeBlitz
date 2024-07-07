/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMyTheme } from "../../Context/ThemeContext";
import "./Graph.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ graphData }) {
  const theme = useMyTheme();

  return (
    <div className="graph-container">
      <Line
        data={{
          labels: graphData.map((i) => i[0]),
          datasets: [
            {
              data: graphData.map((i) => i[1]),
              label: "WPM",
              borderColor: theme.theme.cursor,
            },
          ],
        }}
      />
    </div>
  );
}

export default Graph;
