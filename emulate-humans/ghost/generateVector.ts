import Bezier from 'bezier-js';
import IPoint from '@secret-agent/core-interfaces/IPoint';

const sub = (a: IPoint, b: IPoint): IPoint => ({ x: a.x - b.x, y: a.y - b.y });
const div = (a: IPoint, b: number): IPoint => ({ x: a.x / b, y: a.y / b });
const mult = (a: IPoint, b: number): IPoint => ({ x: a.x * b, y: a.y * b });
const add = (a: IPoint, b: IPoint): IPoint => ({ x: a.x + b.x, y: a.y + b.y });

export default function generateVector(
  startPoint: IPoint,
  destinationPoint: IPoint,
  targetWidth: number,
  overshoot: { threshold: number; radius: number; spread: number },
) {
  const shouldOvershoot = magnitude(direction(startPoint, destinationPoint)) > overshoot.threshold;

  const firstTargetPoint = shouldOvershoot
    ? getOvershootPoint(destinationPoint, overshoot.radius)
    : destinationPoint;
  const points = path(startPoint, firstTargetPoint);

  if (shouldOvershoot) {
    const correction = path(firstTargetPoint, destinationPoint, targetWidth, overshoot.spread);
    points.push(...correction);
  }
  return points.map(point => {
    return { x: Math.round(point.x * 10) / 10, y: Math.round(point.y * 10) / 10 };
  });
}

function path(start: IPoint, end: IPoint, targetWidth = 100, spreadOverride?: number): IPoint[] {
  const minSteps = 25;
  const curve = bezierCurve(start, end, spreadOverride);
  const length = curve.length() * 0.8;
  const baseTime = Math.random() * minSteps;
  const steps = Math.ceil((Math.log2(fitts(length, targetWidth) + 1) + baseTime) * 3);

  return curve
    .getLUT(steps)
    .map(vector => ({
      x: vector.x,
      y: vector.y,
    }))
    .filter(({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y));
}

function bezierCurve(start: IPoint, finish: IPoint, overrideSpread?: number) {
  // could be played around with
  const min = 2;
  const max = 200;
  const vec = direction(start, finish);
  const length = magnitude(vec);
  const spread = Math.min(length, Math.max(min, max));
  const anchors = generateBezierAnchors(start, finish, overrideSpread ?? spread);
  return new Bezier(start, ...anchors, finish);
}

function randomVectorOnLine(a: IPoint, b: IPoint) {
  const vec = direction(a, b);
  const multiplier = Math.random();
  return add(a, mult(vec, multiplier));
}

function randomNormalLine(a: IPoint, b: IPoint, range: number) {
  const randMid = randomVectorOnLine(a, b);
  const normalV = setMagnitude(perpendicular(direction(a, randMid)), range);
  return [randMid, normalV];
}

function generateBezierAnchors(a: IPoint, b: IPoint, spread: number) {
  const side = Math.round(Math.random()) === 1 ? 1 : -1;
  const calc = (): IPoint => {
    const [randMid, normalV] = randomNormalLine(a, b, spread);
    const choice = mult(normalV, side);
    return randomVectorOnLine(randMid, add(randMid, choice));
  };
  return [calc(), calc()].sort((sortA, sortB) => sortA.x - sortB.x);
}

function getOvershootPoint(coordinate: IPoint, radius: number) {
  const a = Math.random() * 2 * Math.PI;
  const rad = radius * Math.sqrt(Math.random());
  const vector = { x: rad * Math.cos(a), y: rad * Math.sin(a) };
  return add(coordinate, vector);
}

/**
 * Calculate the amount of time needed to move from (x1, y1) to (x2, y2)
 * given the width of the element being clicked on
 * https://en.wikipedia.org/wiki/Fitts%27s_law
 */
function fitts(distance: number, width: number) {
  return 2 * Math.log2(distance / width + 1);
}

function direction(a: IPoint, b: IPoint) {
  return sub(b, a);
}

function perpendicular(a: IPoint) {
  return { x: a.y, y: -1 * a.x };
}

function magnitude(a: IPoint) {
  return Math.sqrt(a.x ** 2 + a.y ** 2);
}

function unit(a: IPoint) {
  return div(a, magnitude(a));
}

function setMagnitude(a: IPoint, amount: number) {
  return mult(unit(a), amount);
}
