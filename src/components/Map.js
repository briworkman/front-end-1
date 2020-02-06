import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import Clock from './Clock';
import './App.scss';
import links from '../data/links.js';

import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from 'react-vis';

function Map({ currentX, currentY, rooms, currentRoom }) {
  const [hoverRoom, setHoverRoom] = useState('');
  const corners = [
    { x: 12, y: 12 },
    { x: -1, y: 12 },
    { x: 12, y: -1 },
    { x: -1, y: -1 },
  ];

  const player =
    currentX !== undefined && currentY !== undefined
      ? [{ x: currentX, y: currentY }]
      : null;

  // const roomsArr = rooms
  //   ? rooms.map((room) => ({
  //       x: room.x,
  //       y: room.y,
  //     }))
  //   : null;

  return (
    <div className="grid-overlay-2">
      {!!hoverRoom && <div className="room room--hover">{hoverRoom}</div>}
      <div className="room room--current">{currentRoom.title}</div>
      <Clock />
      <div className="scanlines" id="map">
        <XYPlot height={600} width={600} /*stroke="green"*/>
          <VerticalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />
          <HorizontalGridLines style={{ strokeWidth: 4, opacity: 0.1 }} />

          {/* <MarkSeries
            className="rooms"
            strokeWidth={32}
            opacity="0.1"
            data={roomsArr}
            color="lightGreen"
          /> */}

          <LineMarkSeries
            className="path"
            opacity="0.9"
            lineStyle={{ stroke: 'lightGreen', strokeWidth: '3px' }}
            markStyle={{ stroke: 'lightGreen', strokeWidth: '5px' }}
            onSeriesMouseOut={() => setHoverRoom('')}
            data={links}
            onValueMouseOver={(datapoint) => {
              const hover = rooms.find((room) => {
                return room.x === datapoint.x && room.y === datapoint.y;
              });
              setHoverRoom(hover.title);
            }}
          />

          <MarkSeries
            className="player-dot"
            strokeWidth={18}
            opacity="1"
            data={player}
            color="orange"
          />

          <MarkSeries
            className="corners"
            strokeWidth={0.7}
            opacity="0.0"
            data={corners}
          />
        </XYPlot>
      </div>
    </div>
  );
}

export default Map;
