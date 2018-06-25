export const damage = 12;

export const knights = [
  {
    startingPosition: { x: 1300, y: 2700 },
  },
  {
    startingPosition: { x: 2300, y: 2700 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 3600, y: 2100 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 1600, y: 2300 },
  },
  {
    startingPosition: { x: 1400, y: 1800 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 2700, y: 1600 },
  },
  {
    startingPosition: { x: 1100, y: 1600 },
  },
  {
    startingPosition: { x: 360, y: 1200 },
  },
  {
    startingPosition: { x: 2500, y: 1200 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 2900, y: 1200 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 4400, y: 1200 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 5000, y: 1600 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 3800, y: 1900 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 5300, y: 2300 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 3000, y: 2700 },
  },
  {
    startingPosition: { x: 3300, y: 2700 },
    startingDirection: 'left',
  },
  {
    startingPosition: { x: 4100, y: 500 },
  },
  {
    startingPosition: { x: 3500, y: 500 },
  },
  {
    startingPosition: { x: 3300, y: 500 },
  },
  {
    startingPosition: { x: 700, y: 800 },
  },
  {
    startingPosition: { x: 1000, y: 800 },
  },
  {
    startingPosition: { x: 1300, y: 800 },
  },
]
  .map(knight => ({ ...knight, damage }));
