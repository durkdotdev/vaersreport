// https://recharts.org/en-US/examples/CustomContentTreemap

import { PureComponent } from "react";

import { sequentialColors } from "../../../lib/colors";

class TreemapCustomContent extends PureComponent {
  render() {
    // @ts-ignore
    const { root, depth, x, y, width, height, index, payload, rank, name } =
      this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? sequentialColors[
                    Math.floor(1 + (index / root.children.length) * 4)
                  ]
                : "none",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10)
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {name}
          </text>
        ) : null}
      </g>
    );
  }
}

export default TreemapCustomContent;
