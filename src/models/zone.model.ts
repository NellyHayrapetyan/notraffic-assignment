export default interface Zone {
  id?: number,
  name: string,
  points: [Point, Point, Point, Point],
}

type Point = [number, number];

