import React from "react"
import FileDeck from "./"

const jsonResponse = [
  {
    filePath: "src/components/Wave/index.js",
    numberOfChanges: 40,
    oldCode:
      'import React from "react"\nimport range from "lodash/range"\nimport { styled } from "@material-ui/core/styles"\nimport colorAlpha from "color-alpha"\nimport useColors from "../../hooks/use-colors"\n\nconst Container = styled("div")({})\n\nconst mins = 1000 * 60\nconst hours = 60 * mins\nconst days = 24 * hours\nconst weeks = 7 * days\nconst months = 30 * days\nconst years = 12 * months\nconsole.log({\n  mins,\n  hours,\n  days,\n  weeks,\n  months,\n  years,\n})\nconst timeIntervals = [100, 1000, mins, hours, days, weeks, months, years]\n\nconst findReasonableGridDuration = (duration) => {\n  let bestFittingIntervalIndex = 0\n  let bestFittingIntervalScore = -Infinity\n  for (const [i, timeInterval] of Object.entries(timeIntervals)) {\n    const timeIntervalScore = -1 * Math.abs(duration / timeInterval - 20)\n    if (timeIntervalScore > bestFittingIntervalScore) {\n      bestFittingIntervalIndex = i\n      bestFittingIntervalScore = timeIntervalScore\n    }\n  }\n  return timeIntervals[bestFittingIntervalIndex]\n}\n\nexport const Wave = ({\n  curves,\n  width,\n  height,\n  transformMatrix,\n  durationGroups = [],\n  timestamps = [],\n}) => {\n  const colors = useColors()\n\n  const { x: startTimeOnGraph } = transformMatrix.inverse().applyToPoint(0, 0)\n  const { x: endTimeOnGraph } = transformMatrix.inverse().applyToPoint(500, 0)\n\n  const gridDuration = findReasonableGridDuration(\n    endTimeOnGraph - startTimeOnGraph\n  )\n  const numberOfGridLines = Math.ceil(\n    (endTimeOnGraph - startTimeOnGraph) / gridDuration\n  )\n\n  return (\n    <Container style={{ curves, width, height }}>\n      <svg width={width} height={height}>\n        {range(numberOfGridLines + 1).map((i) => {\n          const { x: lineX } = transformMatrix.applyToPoint(\n            Math.floor(startTimeOnGraph / gridDuration) * gridDuration +\n              gridDuration * i,\n            0\n          )\n\n          return (\n            <line\n              key={i}\n              stroke={colors.Selection}\n              x1={lineX}\n              x2={lineX}\n              y1={0}\n              y2={height}\n            />\n          )\n        })}\n        {durationGroups.flatMap(({ durations, color }) => {\n          return durations.map((duration) => {\n            const { x: startX } = transformMatrix.applyToPoint(\n              duration.start,\n              0\n            )\n            const { x: endX } = transformMatrix.applyToPoint(duration.end, 0)\n            return (\n              <rect\n                fill={colorAlpha(color, 0.2)}\n                x={startX}\n                y={0}\n                width={endX - startX}\n                height={height}\n              />\n            )\n          })\n        })}\n        {curves.map((curve, i) => (\n          <polyline\n            key={i}\n            stroke={curve.color}\n            fill="transparent"\n            points={curve.data\n              .map(([t, y]) => {\n                const p = transformMatrix.applyToPoint(t, y)\n                return `${p.x},${p.y}`\n              })\n              .join(" ")}\n          />\n        ))}\n        {timestamps.map((ts, i) => {\n          const { x } = transformMatrix.applyToPoint(ts.time, 0)\n          return (\n            <line\n              key={i}\n              x1={x}\n              x2={x}\n              y1={0}\n              y2={height}\n              stroke={ts.color}\n              strokeWidth={1}\n            />\n          )\n        })}\n      </svg>\n    </Container>\n  )\n}\n\nexport default Wave\n',
    newCode:
      'import React from "react"\nimport range from "lodash/range"\nimport { styled } from "@material-ui/core/styles"\nimport colorAlpha from "color-alpha"\nimport useColors from "../../hooks/use-colors"\n\nconst Container = styled("div")({})\n\nconst mins = 1000 * 60\nconst hours = 60 * mins\nconst days = 24 * hours\nconst weeks = 7 * days\nconst months = 30 * days\nconst years = 12 * months\nconsole.log({\n  mins,\n  hours,\n  days,\n  weeks,\n  months,\n  years,\n})\nconst timeIntervals = [1, 100, 1000, mins, hours, days, weeks, months, years]\n\nconst findReasonableGridDuration = (duration) => {\n  let bestFittingIntervalIndex = 0\n  let bestFittingIntervalScore = -Infinity\n  for (const [i, timeInterval] of Object.entries(timeIntervals)) {\n    const timeIntervalScore = -1 * Math.abs(duration / timeInterval - 20)\n    if (timeIntervalScore > bestFittingIntervalScore) {\n      bestFittingIntervalIndex = i\n      bestFittingIntervalScore = timeIntervalScore\n    }\n  }\n  return [\n    timeIntervals[bestFittingIntervalIndex],\n    timeIntervals[bestFittingIntervalIndex - 1],\n  ]\n}\n\nexport const Wave = ({\n  curves,\n  width,\n  height,\n  transformMatrix,\n  durationGroups = [],\n  timestamps = [],\n}) => {\n  const colors = useColors()\n\n  const { x: startTimeOnGraph } = transformMatrix.inverse().applyToPoint(0, 0)\n  const { x: endTimeOnGraph } = transformMatrix.inverse().applyToPoint(500, 0)\n\n  const [majorDuration, minorDuration] = findReasonableGridDuration(\n    endTimeOnGraph - startTimeOnGraph\n  )\n  const numberOfMajorGridLines = Math.ceil(\n    (endTimeOnGraph - startTimeOnGraph) / majorDuration\n  )\n  const numberOfMinorGridLines = Math.ceil(\n    (endTimeOnGraph - startTimeOnGraph) / minorDuration\n  )\n\n  return (\n    <Container style={{ curves, width, height }}>\n      <svg width={width} height={height}>\n        {range(numberOfMajorGridLines + 1).map((i) => {\n          const { x: lineX } = transformMatrix.applyToPoint(\n            Math.floor(startTimeOnGraph / majorDuration) * majorDuration +\n              majorDuration * i,\n            0\n          )\n\n          return (\n            <line\n              key={i}\n              stroke={colors.Selection}\n              x1={lineX}\n              x2={lineX}\n              y1={0}\n              y2={height}\n            />\n          )\n        })}\n        {range(numberOfMinorGridLines).map((i) => {\n          const { x: lineX } = transformMatrix.applyToPoint(\n            Math.floor(startTimeOnGraph / majorDuration) * minorDuration +\n              minorDuration * i,\n            0\n          )\n\n          return (\n            <line\n              key={i}\n              stroke={colors.Selection}\n              x1={lineX}\n              x2={lineX}\n              y1={0}\n              y2={height}\n            />\n          )\n        })}\n        {durationGroups.flatMap(({ durations, color }) => {\n          return durations.map((duration) => {\n            const { x: startX } = transformMatrix.applyToPoint(\n              duration.start,\n              0\n            )\n            const { x: endX } = transformMatrix.applyToPoint(duration.end, 0)\n            return (\n              <rect\n                fill={colorAlpha(color, 0.2)}\n                x={startX}\n                y={0}\n                width={endX - startX}\n                height={height}\n              />\n            )\n          })\n        })}\n        {curves.map((curve, i) => (\n          <polyline\n            key={i}\n            stroke={curve.color}\n            fill="transparent"\n            points={curve.data\n              .map(([t, y]) => {\n                const p = transformMatrix.applyToPoint(t, y)\n                return `${p.x},${p.y}`\n              })\n              .join(" ")}\n          />\n        ))}\n        {timestamps.map((ts, i) => {\n          const { x } = transformMatrix.applyToPoint(ts.time, 0)\n          return (\n            <line\n              key={i}\n              x1={x}\n              x2={x}\n              y1={0}\n              y2={height}\n              stroke={ts.color}\n              strokeWidth={1}\n            />\n          )\n        })}\n      </svg>\n    </Container>\n  )\n}\n\nexport default Wave\n',
  },
]

export default {
  title: "FileDeck_BugInstantScroll",
  component: FileDeck,
}

export const Primary = () => {
  return <FileDeck files={jsonResponse} />
}
