import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function PieChartClientes({ data_grafics_clientes }) {
    const [selected, setSelected] = useState(0);
    // const [hovered, setHovered] = useState<number | undefined>(undefined);
    const lineWidth = 60;

    return(
        <PieChart
            style={{
                fontFamily:
                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '8px',
            }}
            data={data_grafics_clientes}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={60}
            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
            segmentsShift={(index) => (index === selected ? 6 : 1)}
            animate
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            labelPosition={100 - lineWidth / 2}
            labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
            }}
            onClick={(_, index) => {
                setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
                // setHovered(index);
            }}
            onMouseOut={() => {
                //setHovered(undefined);
            }}
        />
    );
}
export default PieChartClientes;