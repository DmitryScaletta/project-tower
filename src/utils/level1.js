export const damage = 6;

export const knights = [
  {
    startingPosition: { x: 1200, y: 700 },
  },
  {
    startingPosition: { x: 2400, y: 300 },
  },
  {
    startingPosition: { x: 3450, y: 600 },
  },
  {
    startingPosition: { x: 3650, y: 600 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 6150, y: 300 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 6350, y: 300 },
  },
  {
    startingPosition: { x: 8050, y: 600 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 7850, y: 1500 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 7850, y: 2600 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 6700, y: 2100 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 5400, y: 1500 },
  },
  {
    startingPosition: { x: 5600, y: 1500 },
  },
  {
    startingPosition: { x: 4900, y: 2400 },
  },
  {
    startingPosition: { x: 2100, y: 1500 },
  },
  {
    startingPosition: { x: 2300, y: 1500 },
  },
  {
    startingPosition: { x: 2500, y: 1500 },
  },
  {
    startingPosition: { x: 1900, y: 2600 },
  },
  {
    startingPosition: { x: 1500, y: 2600 },
  },
  {
    startingPosition: { x: 200, y: 2600 },
  },
]
  .map(knight => ({ ...knight, damage }));
